import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleCard = ({ path, article }: any) => {
  return (
    <Link href={path}>
      <article className="flex flex-col space-y-2 p-4 rounded-md border border-white/15 min-h-[390px] h-full max-w-[350px] w-full">
        <div className="h-[17rem] overflow-hidden">
          <Image
            src={article?.image}
            alt={article?.title || "Article Image"}
            width={804}
            height={452}
            className="w-full h-full rounded-md object-cover"
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="flex lg:flex-row w-full justify-between items-center">
            <h2 className="text-lg lg:text-xl font-bold">{article?.title}</h2>
          </div>
          <p className="line-clamp-1 text-gray9 text-sm font-normal flex-1 overflow-hidden">
            {article?.subtitle?.split(" ")?.length > 50
              ? article?.subtitle?.split(" ")?.slice(0, 50)?.join(" ") + "..."
              : article?.subtitle}
          </p>
          <p className="text-sm text-gray9 font-normal">
            {new Date(article?._creationTime).toLocaleDateString()}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
