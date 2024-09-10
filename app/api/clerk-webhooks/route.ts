import { api } from "@/convex/_generated/api";
import { WebhookEvent } from "@clerk/nextjs/server";
import { useMutation } from "convex/react";
import { headers } from "next/headers";
import { Webhook } from "svix";
import slugify from "slugify";
import { NextResponse } from "next/server";
import { Id } from "@/convex/_generated/dataModel";

export async function POST(req: Request) {
  const createUser = useMutation(api.documents.createUser);
  const updateUser = useMutation(api.documents.updateUser);
  const deleteUser = useMutation(api.documents.deleteUser);

  const WEBHOOK_SECRET = process.env.WEBHOOKS_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timetamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id && !svix_timestamp && !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id as string,
      "svix-timestamp": svix_timestamp as string,
      "svix-signature": svix_signature as string,
    }) as WebhookEvent;
  } catch (error) {
    console.log(error);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const evenType = evt.type;

  if (evenType === "user.created") {
    const { image_url, first_name, last_name, username, id, email_addresses } =
      evt.data;

    const convexUser = await createUser({
      clerkId: id,
      name:
        first_name || last_name
          ? `${first_name} || ${last_name} || "userStrive"`
          : username!,
      userName: username! || slugify(`${first_name}${last_name}`),
      email: email_addresses[0].email_address,
      avatar: image_url,
      bio: "User at Strive",
    });
    return NextResponse.json({ message: "OK", users: convexUser });
  } else if (evenType === "user.updated") {
    const { image_url, first_name, last_name, username, id, email_addresses } =
      evt.data;

    const convexUser = await updateUser({
      clerkId: id,
      name:
        first_name || last_name
          ? `${first_name || ""} ${last_name || ""}`
          : username!,
      userName: username!,
      email: email_addresses[0].email_address,
      avatar: image_url,
      id: id as Id<"users">,
    });
    return NextResponse.json({ message: "OK", users: convexUser });
  }

  if (evenType === "user.deleted") {
    const { id } = evt.data;

    const deleteUsers = await deleteUser({
      id: id as Id<"users">,
      clerkId: id as string,
    });

    return NextResponse.json({ message: "OK", user: deleteUsers });
  }

  return new Response("", { status: 200 });
}
