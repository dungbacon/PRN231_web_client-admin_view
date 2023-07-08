import React from "react";
import DOMPurify from "dompurify";

const StringToHtml = ({ input = String, props }) => {
  const htmlString = input;
  const markup = { __html: DOMPurify.sanitize(htmlString) };
  return <div className={props} dangerouslySetInnerHTML={markup} />;
};

export default StringToHtml;
