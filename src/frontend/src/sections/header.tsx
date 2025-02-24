interface DecorationProps {
  offset: string;
  className?: string;
}

function LeftDecoration({ offset, className = "" }: DecorationProps) {
  return (
    <svg
      className={`h-auto w-16 sm:w-20 md:w-24 flex-shrink-0 p-2 absolute ${offset} ${className}`}
      viewBox="0 0 91 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m35.878 14.162 1.333-5.369 1.933 5.183c4.47 11.982 14.036 21.085 25.828 24.467l5.42 1.555-5.209 2.16c-11.332 4.697-19.806 14.826-22.888 27.237l-1.333 5.369-1.933-5.183C34.56 57.599 24.993 48.496 13.201 45.114l-5.42-1.555 5.21-2.16c11.331-4.697 19.805-14.826 22.887-27.237Z"
        fill="#FE4A60"
        stroke="#000"
        strokeWidth="3.445"
      />
      <path
        d="M79.653 5.729c-2.436 5.323-9.515 15.25-18.341 12.374m9.197 16.336c2.6-5.851 10.008-16.834 18.842-13.956m-9.738-15.07c-.374 3.787 1.076 12.078 9.869 14.943M70.61 34.6c.503-4.21-.69-13.346-9.49-16.214M14.922 65.967c1.338 5.677 6.372 16.756 15.808 15.659M18.21 95.832c-1.392-6.226-6.54-18.404-15.984-17.305m12.85-12.892c-.41 3.771-3.576 11.588-12.968 12.681M18.025 96c.367-4.21 3.453-12.905 12.854-14"
        stroke="#000"
        strokeWidth="2.548"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RightDecoration({ offset, className = "" }: DecorationProps) {
  return (
    <svg
      className={`w-16 lg:w-20 h-auto flex-shrink-0 absolute ${offset} ${className}`}
      viewBox="0 0 92 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m35.213 16.953.595-5.261 2.644 4.587a35.056 35.056 0 0 0 26.432 17.33l5.261.594-4.587 2.644A35.056 35.056 0 0 0 48.23 63.28l-.595 5.26-2.644-4.587a35.056 35.056 0 0 0-26.432-17.328l-5.261-.595 4.587-2.644a35.056 35.056 0 0 0 17.329-26.433Z"
        fill="#5CF1A4"
        stroke="#000"
        strokeWidth="2.868"
      />
      <path
        d="M75.062 40.108c1.07 5.255 1.072 16.52-7.472 19.54m7.422-19.682c1.836 2.965 7.643 8.14 16.187 5.121-8.544 3.02-8.207 15.23-6.971 20.957-1.97-3.343-8.044-9.274-16.588-6.254M12.054 28.012c1.34-5.22 6.126-15.4 14.554-14.369M12.035 28.162c-.274-3.487-2.93-10.719-11.358-11.75C9.104 17.443 14.013 6.262 15.414.542c.226 3.888 2.784 11.92 11.212 12.95"
        stroke="#000"
        strokeWidth="2.319"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="bg-[#FFFDF8] py-8">
      <div className="relative max-w-fit mx-auto flex sm:flex-row flex-col justify-center items-start sm:items-center">
        <LeftDecoration offset="right-[112%] bottom-[43%]" />
        <h1 className="text-4xl sm:text-5xl sm:pt-20 lg:pt-5 md:text-6xl lg:text-7xl font-bold tracking-tighter w-full inline-block text-left md:text-center relative">
          Prompt-friendly
          <br />
          codebase&nbsp;
        </h1>
        <RightDecoration offset="left-[112%] top-[67.5%]" />
      </div>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto text-center mt-8 max-w-fit">
        Turn any Git repository into a simple text digest of its codebase.
      </p>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto text-center mt-0 max-w-fit">
        This is useful for feeding a codebase into any LLM.
      </p>
    </header>
  )
}
