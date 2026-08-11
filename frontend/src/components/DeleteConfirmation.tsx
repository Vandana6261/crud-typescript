import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  jobTitle: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  jobTitle,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={isDeleting ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-cardBorder bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cardBorder px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-title">
                Delete Job
              </h2>
              <p className="text-xs text-muted">
                This action cannot be undone
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-inputBg hover:text-title disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <p className="text-sm leading-6 text-body">
            Are you sure you want to delete this job listing?
          </p>

          <div className="mt-4 rounded-xl border border-cardBorder bg-inputBg px-4 py-3">
            <p className="text-sm font-semibold text-title truncate">
              {jobTitle}
            </p>
          </div>

          <p className="mt-3 text-xs leading-5 text-muted">
            Once deleted, this job listing will no longer be available to
            candidates.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-cardBorder bg-inputBg px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className=" rounded-lg border border-cardBorder px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-card hover:text-title disabled:cursor-not-alloweddisabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className=" inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600 hover:shadow-red-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />

            {isDeleting ? "Deleting..." : "Delete Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;