// import DashboardWrapper from "@/app/cms/_component/DashboardWrapper";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Message, useChat } from "@ai-sdk/react";
// import { ExternalLink } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { toast } from "sonner";

// // TODO: CHỈ CHO USER DÙNG CHATBOT AI KHOẢNG 1 ĐẾN 2 LẦN (ĐỂ TRÁNH VIỆC SPAM GÂY QUÁ TẢI SERVER - DDOS) LẦN THỨ 3 PHẢI NÂNG CẤP GÓI THÌ MỚI CHO DÙNG TIẾP TỤC

// const Chat = ({ message: initialMessages }: { message: Message[] }) => {
//   const {
//     messages,
//     input,
//     handleInputChange,
//     handleSubmit,
//     setInput,
//     error,
//     append,
//     isLoading,
//     stop,
//   } = useChat({
//     initialMessages,
//     sendExtraMessageFields: true,
//   });

//   const [createDocumentShowPopup, setCreateDocumentShowPopup] =
//     useState<boolean>(false);
//   const messageEndRef = useRef<HTMLDivElement>(null);
//   const [streamingComplete, setStreamingComplete] = useState<boolean>(true);

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message);
//     }
//   }, [error]);

//   useEffect(() => {
//     messageEndRef?.current?.scrollIntoView();
//   }, [messages]);

//   useEffect(() => {
//     setStreamingComplete(false);
//     const timeoutId = setTimeout(() => {
//       setStreamingComplete(true);

//       return () => clearTimeout(timeoutId);
//     }, 500);
//   }, [messages]);

//   const renderToolInvocation = (toolInvocation: any) => {
//     const toolCallId = toolInvocation.toolCallId;
//     const message = toolInvocation?.result?.message;
//     const result = toolInvocation?.result.result;

//     switch (toolInvocation.toolName) {
//       case "create-site":
//         return (
//           <div key={toolCallId}>
//             <div className="bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap px-3 py-2 rounded-lg w-fit">
//               {message}
//             </div>
//             {toolInvocation?.result && (
//               <div className="pt-[0.5rem] flex gap-1">
//                 <Link
//                   href={`https://${toolInvocation?.result?.site_subdomain}.strive-platform.xyz`}
//                   target="_blank"
//                 >
//                   <Button className="size-5 border border-white/15 bg-inherit">
//                     <ExternalLink className="mr-1 size-4" />
//                     Website
//                   </Button>
//                 </Link>
//                 <Link
//                   href={`/cms/sites/${toolInvocation?.result?.site_id}`}
//                   target="_blank"
//                 >
//                   <Button className="size-5 border border-white/15 bg-inherit">
//                     <ExternalLink className="mr-1 size-4" />
//                     Dashboard
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         );
//       case "read_site":
//         return (
//           <div key={toolCallId}>
//             <div className="flex gap-2 flex-col bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap px-3 py-2 rounded-lg w-fit">
//               {message}
//             </div>
//             <div className="flex gap-2 flex-wrap mt-[1rem]">
//               {result?.length > 0 &&
//                 result?.map((site: any) => (
//                   <Link
//                     key={site?.id}
//                     href={`/cms/sites/${site?.site_subdomain}`}
//                     prefetch={true}
//                     className="flex flex-col rounded-md w-[350px]  hover:cursor-pointer transition-shadow duration-300"
//                     target="_blank"
//                   >
//                     <Card className="flex flex-col px-4 justify-between h-full py-4">
//                       <div className="flex flex-col w-full justify-center items-start">
//                         <h2 className="text-lg font-bold">{site?.site_name}</h2>
//                         <p className="text-gray-400 pt-1 text-sm">
//                           {site?.site_description}
//                         </p>
//                       </div>
//                       <div className="flex justify-between items-center mt-2 w-full">
//                         <p className="text-xs px-2 py-1 rounded-full border bg-zinc-900 text-gray-300">
//                           {site?.site_subdomain}.strive-platform.xyz
//                         </p>
//                         <p className="text-xs text-gray9">
//                           {new Date(site?.creationTime).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </Card>
//                   </Link>
//                 ))}
//             </div>
//           </div>
//         );
//       case "update_site_name":
//       case "update_sub_domain":
//         return (
//           <div
//             key={toolCallId}
//             className="bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap px-3 py-2 rounded-lg w-fit"
//           >
//             {message &&
//               JSON.parse(result).map((info: any) => (
//                 <div key={info?.site_id}>
//                   {message + " "}
//                   {info?.site_name}:{" "}
//                   <Link
//                     href={`https://${info?.site_subdomain}.strive-platform.xyz`}
//                     className="underline"
//                     target="_blank"
//                   >
//                     {info?.site_subdomain + ".strive-platform.xyz"}
//                   </Link>
//                 </div>
//               ))}
//           </div>
//         );
//       case "generate_blog_image":
//         return (
//           <div
//             key={toolCallId}
//             className="bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap p-2 rounded-lg w-fit"
//           >
//             {toolInvocation?.result?.images?.[0]?.url ? (
//               <Image
//                 className="rounded-2xl"
//                 src={toolInvocation?.result?.images?.url}
//                 width={500}
//                 height={300}
//                 alt=""
//                 priority={true}
//               />
//             ) : (
//               <Skeleton className="w-[500px] h-[300px]" />
//             )}
//           </div>
//         );

//       case "search_internet":
//         return (
//           <div key={toolCallId} className="flex flex-col gap-2">
//             {toolInvocation?.result?.result?.snippet &&
//               toolInvocation?.result?.result?.link && (
//                 <div className="bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap p-2 rounded-lg w-fit">
//                   <p>{toolInvocation?.result?.result?.title}</p>
//                   <Separator className="w-full mt-1 mb-2" />
//                   <p>{toolInvocation?.result?.result?.snippet}</p>
//                   <Link
//                     href={toolInvocation?.result?.result?.link}
//                     target="_blank"
//                   >
//                     <Button className="mt-[0.5rem]">Source</Button>
//                   </Link>
//                 </div>
//               )}
//             {toolInvocation?.result?.result?.title &&
//               toolInvocation?.result?.result?.answer && (
//                 <div className="bg-blue-700 bg-opacity-10 text-sm whitespace-pre-wrap p-2 rounded-lg w-fit">
//                   <p>{toolInvocation?.result?.result?.title}</p>
//                   <p>{toolInvocation?.result?.result?.answer}</p>
//                 </div>
//               )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderMessageContent = (m: any) => {
//     switch (m?.type) {
//       case "tool-result_read-site":
//         return (
//           <div className="flex gap-2 flex-wrap w-full mt-2">
//             {m?.result?.map((info: any, index: number) => (
//               <Link
//                 key={index}
//                 href={`/cms/sites/${info.site_subdomain}`}
//                 prefetch={true}
//                 className="flex flex-col rounded-xl max-w-[350px] w-full min-h-[150px] hover:cursor-pointer transition-shadow duration-300"
//                 target="_blank"
//               >
//                 <Card className="flex flex-col px-[1rem] justify-between h-full py-[1rem]">
//                   <div className="flex flex-col w-full justify-center items-start">
//                     <h2 className="text-lg font-bold">{info.site_name}</h2>
//                     <p className="text-gray-400 pt-1 text-sm">
//                       {info.site_description}
//                     </p>
//                   </div>
//                   <div className="flex justify-between mt-2 items-center w-full">
//                     <p className="text-xs px-2 py-1 rounded-full border bg-zinc-900 text-gray-300">
//                       {info.site_subdomain}.tsafi.xyz
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {new Date(info.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         );
//       case "tool-result_genarate_blog_image":
//         return (
//           <>
//             <Image
//               className="rounded-2xl"
//               src={m?.result?.url}
//               width={500}
//               height={300}
//               alt="img-generate"
//             />
//           </>
//         );
//       case "tool-result_search_internet":
//         return (
//           <div className="flex flex-col gap-2">
//             <div className="bg-blue-700 whitespace-pre-wrap bg-opacity-10 text-sm px-3 py-2 rounded-lg w-fit">
//               {m?.result?.title}
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };
//   return (
//     <DashboardWrapper>
//       <div className="flex flex-col h-[calc(100vh-100px)] w-full">
//         <div className="flex-grow overflow-y-auto p-4 pb-[11rem]">
//           {messages.map((m: any, index: number) => (
//             <div key={index}></div>
//           ))}
//         </div>
//       </div>
//     </DashboardWrapper>
//   );
// };

// export default Chat;
