import { useState } from "react";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiChevronDown,
} from "react-icons/fi";

function CreateForm() {
  const [fields, setFields] = useState([
    {
      label: "",
      type: "Text",
      required: true,
      options: [],
    },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      {
        label: "",
        type: "Text",
        required: false,
        options: [],
      },
    ]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-800 bg-[#111827] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Create Form
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Create a form to collect project information
            </p>
          </div>

          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6 p-6">

          {/* Form Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Form Name <span className="text-red-400">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Bug Report"
              className="w-full rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description <span className="text-red-400">*</span>
            </label>

            <textarea
              rows={3}
              placeholder="Describe the purpose of this form..."
              className="w-full resize-none rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-indigo-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Status <span className="text-red-400">*</span>
            </label>

            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-gray-700 bg-[#0f172a] px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500">
                <option>Draft</option>
                <option>Active</option>
              </select>

              <FiChevronDown
                className="pointer-events-none absolute right-3 top-3 text-gray-500"
                size={18}
              />
            </div>
          </div>

          {/* Fields */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Form Fields
                </h3>

                <p className="text-xs text-gray-500">
                  Add the questions users need to answer
                </p>
              </div>

              <button
                onClick={addField}
                className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <FiPlus size={16} />
                Add Field
              </button>
            </div>

            <div className="space-y-4">

              {fields.map((field, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-800 bg-[#0f172a] p-4"
                >
                  {/* Field Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      FIELD {index + 1}
                    </span>

                    {fields.length > 1 && (
                      <button
                        onClick={() => removeField(index)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    {/* Label */}
                    <div>
                      <label className="mb-2 block text-sm text-gray-300">
                        Field Label{" "}
                        <span className="text-red-400">*</span>
                      </label>

                      <input
                        type="text"
                        placeholder="e.g. Bug Title"
                        className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <label className="mb-2 block text-sm text-gray-300">
                        Field Type{" "}
                        <span className="text-red-400">*</span>
                      </label>

                      <div className="relative">
                        <select
                          className="w-full appearance-none rounded-lg border border-gray-700 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                        >
                          <option>Text</option>
                          <option>Textarea</option>
                          <option>Number</option>
                          <option>Select</option>
                          <option>Radio</option>
                          <option>Checkbox</option>
                          <option>Date</option>
                          <option>File</option>
                        </select>

                        <FiChevronDown
                          className="pointer-events-none absolute right-3 top-3 text-gray-500"
                          size={17}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Required */}
                  <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-800 bg-[#111827] px-3 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Required field
                      </p>

                      <p className="text-xs text-gray-500">
                        User must answer this field
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked={field.required}
                      className="h-4 w-4 accent-indigo-500"
                    />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-800 px-6 py-4">
          <button className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800">
            Cancel
          </button>

          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500">
            Create Form
          </button>
        </div>

      </div>
    </div>
  );
}

export default CreateForm;