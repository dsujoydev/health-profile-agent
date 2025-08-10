// Process inline formatting (bold, italic, etc.)
export const processInlineFormatting = (text: string) => {
  // Handle bold text (**text**)
  let processed = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');

  // Handle italic text (*text*)
  processed = processed.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Handle inline code (`code`)
  processed = processed.replace(
    /`(.*?)`/g,
    '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
  );

  return <span dangerouslySetInnerHTML={{ __html: processed }} />;
};

export const renderMarkdown = (text: string) => {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, index) => {
    // Handle headers (###, ##, #)
    if (line.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="text-lg font-semibold text-gray-800 mt-6 mb-3 first:mt-0 border-l-4 border-blue-500 pl-3"
        >
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="text-xl font-bold text-tranparent mt-8 mb-4 first:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <h1 key={index} className="text-3xl font-bold text-gray-900 mt-6 mb-6 first:mt-0 text-center">
          {line.replace("# ", "")}
        </h1>
      );
    }

    // Handle bullet points
    if (line.startsWith("- ") || line.startsWith("* ") || line.startsWith("• ")) {
      return (
        <li key={index} className="ml-6 mb-2 text-gray-700 leading-relaxed list-disc marker:text-blue-500">
          {processInlineFormatting(line.replace(/^[-*•] /, ""))}
        </li>
      );
    }

    // Handle numbered lists
    if (/^\d+\. /.test(line)) {
      return (
        <li key={index} className="ml-6 mb-2 text-gray-700 leading-relaxed list-decimal marker:text-blue-500">
          {processInlineFormatting(line.replace(/^\d+\. /, ""))}
        </li>
      );
    }

    // Handle blockquotes
    if (line.startsWith("> ")) {
      return (
        <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">
          {processInlineFormatting(line.replace("> ", ""))}
        </blockquote>
      );
    }

    // Handle empty lines
    if (line.trim() === "") {
      return <br key={index} />;
    }

    // Regular paragraphs
    return (
      <p key={index} className="mb-2 text-gray-700 leading-relaxed">
        {processInlineFormatting(line)}
      </p>
    );
  });
};
