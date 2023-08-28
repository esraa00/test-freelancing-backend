import { ReactNode } from "react";
import Spinner from "../Spinner";

type ModalProps = {
  title?: string;
  primaryActionButtonLabel?: string;
  closeButtonLabel: string;
  handleClose: () => void;
  handlePrimaryAction?: () => void;
  children: ReactNode;
  isLoading?: boolean;
};

export default function ModalWrap({
  title,
  primaryActionButtonLabel,
  closeButtonLabel,
  handleClose,
  handlePrimaryAction,
  children,
  isLoading,
}: ModalProps) {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={handleClose}
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full rounded-lg overflow-hidden overflow-y-auto">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-gray-500">
            {title && (
              <>
                <h2
                  className="text-lg font-medium leading-none text-gray-900 pb-3 mb-3 border-b border-slate-200"
                  id="modal-title"
                >
                  {title}
                </h2>
              </>
            )}
            {children}
          </div>
          <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 sm:px-6 sm:flex justify-end space-x-2">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full inline-flex justify-center rounded-md border border-slate-200 shadow-sm px-4 py-2 text-base font-medium bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto"
                >
                  {closeButtonLabel}
                </button>
                {handlePrimaryAction && (
                  <button
                    type="button"
                    onClick={handlePrimaryAction}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto"
                  >
                    {primaryActionButtonLabel}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
