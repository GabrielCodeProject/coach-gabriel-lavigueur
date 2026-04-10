import ReactMarkdown from "react-markdown";

type MarkdownBodyProps = {
  children: string;
  className?: string;
};

export function MarkdownBody({ children, className }: MarkdownBodyProps) {
  return (
    <div
      className={`prose prose-neutral max-w-3xl text-foreground ${className ?? ""}`}
    >
      <ReactMarkdown
        components={{
          h1: (props) => (
            <h1
              className="mt-10 text-3xl font-semibold tracking-tight text-foreground first:mt-0 md:text-4xl"
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className="mt-10 text-2xl font-semibold tracking-tight text-foreground first:mt-0 md:text-3xl"
              {...props}
            />
          ),
          h3: (props) => (
            <h3
              className="mt-6 text-xl font-semibold tracking-tight text-foreground first:mt-0"
              {...props}
            />
          ),
          p: (props) => (
            <p
              className="mt-4 text-base leading-relaxed text-muted-foreground"
              {...props}
            />
          ),
          ul: (props) => (
            <ul
              className="mt-4 flex flex-col gap-2 text-base leading-relaxed text-muted-foreground [&>li]:pl-5 [&>li]:relative [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:content-['•'] [&>li]:before:text-primary"
              {...props}
            />
          ),
          ol: (props) => (
            <ol
              className="mt-4 list-decimal pl-5 text-base leading-relaxed text-muted-foreground marker:text-primary"
              {...props}
            />
          ),
          a: (props) => (
            <a
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
              {...props}
            />
          ),
          strong: (props) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: (props) => <em className="italic" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="mt-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
              {...props}
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
