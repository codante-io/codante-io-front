import MarkdownRenderer from "~/components/ui/markdown-renderer";
import { cn } from "~/lib/utils/cn";

function TestimonialCard({
  testimonial,
  avatarUrl,
  name,
  socialMediaProfileName,
  socialMediaProfileUrl,
  wide = false,
  columnSpanClassName,
}: {
  testimonial: string;
  avatarUrl: string;
  name: string;
  socialMediaProfileName: string;
  socialMediaProfileUrl: string;
  wide?: boolean;
  columnSpanClassName?: string;
}) {
  const spanClassName =
    columnSpanClassName ??
    (wide ? "col-span-1 xl:col-span-4" : "col-span-1 xl:col-span-3");

  return (
    <article
      className={cn(
        "flex gap-6 shrink-0 flex-col justify-between w-full bg-background-50 lg:h-96 dark:bg-background-800 p-5 text-sm rounded-xl border-[1.5px] border-background-200 dark:border-background-600 hover:border-blue-300 hover:shadow-lg dark:hover:border-background-600 transition-all dark:hover:shadow-lg bg-grainy overflow-hidden",
        spanClassName,
      )}
    >
      <MarkdownRenderer
        prose
        // fontSize="small"
        markdown={testimonial}
        wrapperClasses="text-start text-gray-600 dark:text-gray-400"
      />
      {/* <p className="text-start prose text-gray-600 dark:text-gray-400">{testimonial}</p> */}
      <div className="flex items-center gap-5">
        <div>
          <img src={avatarUrl} alt="Avatar" className="w-10 rounded-full" />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-brand-500 font-bold">{name}</h3>
          <a
            href={socialMediaProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500"
          >
            {socialMediaProfileName}
          </a>
        </div>
      </div>
    </article>
  );
}

export default TestimonialCard;
