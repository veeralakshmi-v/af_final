import React, { useEffect, useState } from 'react';

const tagDefinitions = {
  'doctype': 'Tells the browser which version of HTML the page is written in. For HTML5, it is simply <!DOCTYPE html>.',
  'html': 'The root element of an HTML page. All other elements must be descendants of this tag.',
  'head': 'Contains meta-information about the HTML document, such as its title, linked CSS, and scripts.',
  'title': "Specifies a title for the HTML page, which is shown in the browser's title bar or page tab.",
  'body': "Defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, and images.",
  'h1': 'Defines the most important heading on the page. You should generally only have one <h1> per page.',
  'h2': 'Defines a second-level heading, used to separate major sections of content.',
  'p': 'Defines a paragraph of text.',
  'strong': 'Defines important text. Browsers typically render it in bold.',
  'em': 'Defines emphasized text. Browsers typically render it in italics.',
  'u': 'Defines text that should be underlined.',
  'mark': 'Defines text that should be highlighted or marked for reference.',
  'blockquote': 'Defines a section that is quoted from another source.',
  'ul': 'Defines an unordered (bulleted) list.',
  'ol': 'Defines an ordered (numbered) list.',
  'li': 'Defines a list item inside a <ul> or <ol>.',
  'hr': 'Defines a thematic break (horizontal rule) in an HTML page.',
  'header': 'Represents introductory content, typically a group of introductory or navigational aids.',
  'main': 'Specifies the main content of a document. It should be unique to the document.',
  'article': 'Specifies independent, self-contained content, such as a blog post or news story.',
  'footer': 'Defines a footer for a document or section, often containing copyright and author information.',
  'img': 'Used to embed an image in an HTML page. It requires a "src" attribute.',
  'a': 'Defines a hyperlink, which is used to link from one page to another.'
};

export default function TagTooltip() {
  const [tooltipState, setTooltipState] = useState({ show: false, x: 0, y: 0, tag: '', desc: '' });

  useEffect(() => {
    const handleClick = (e) => {
      const tagToken = e.target.closest('.token.tag');
      const isTooltipClick = e.target.closest('.tag-tooltip');
      
      if (!tagToken && !isTooltipClick) {
        setTooltipState(s => ({ ...s, show: false }));
        return;
      }

      if (tagToken) {
        let rawText = tagToken.textContent.toLowerCase();
        let match = rawText.match(/[a-z0-9]+/i);
        if (rawText.includes('doctype')) match = ['doctype'];
        
        if (match) {
          let tagName = match[0];
          let definition = tagDefinitions[tagName];
          
          if (definition) {
            const rect = tagToken.getBoundingClientRect();
            setTooltipState({
              show: true,
              x: rect.left + window.scrollX,
              y: rect.bottom + window.scrollY + 10,
              tag: tagName === 'doctype' ? '<!DOCTYPE html>' : `<${tagName}>`,
              desc: definition
            });
          } else {
            setTooltipState(s => ({ ...s, show: false }));
          }
        }
      }
    };

    document.body.addEventListener('click', handleClick);
    return () => document.body.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={`tag-tooltip ${tooltipState.show ? 'show' : ''}`} style={{
      left: tooltipState.x,
      top: tooltipState.y,
    }}>
      <h4>{tooltipState.tag}</h4>
      <p>{tooltipState.desc}</p>
    </div>
  );
}
