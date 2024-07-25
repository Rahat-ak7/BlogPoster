import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: "defaultValue",
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "charmap",
                "preview",
                "anchor",
                "searchplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "tabel",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo| blocks |image| bold italic forecolor |alignleft bold italic forecolor|alignleft aligncenter alignright alignjustify |bullist numlist outdent indent|removeformat|remove ",
              content_style:
                "body{font-family:Helvetica,Arial,sans-serif,font-size:14px}",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
