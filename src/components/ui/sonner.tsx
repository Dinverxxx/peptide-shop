import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      position="top-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-red-300 group-[.toaster]:shadow-lg group-[.toaster]:[--toast-icon-color:theme(colors.red.600)] dark:group-[.toaster]:bg-red-50 dark:group-[.toaster]:text-gray-900 dark:group-[.toaster]:border-red-400",
          description: "group-[.toast]:text-gray-700 dark:group-[.toast]:text-gray-800",
          actionButton: "group-[.toast]:bg-red-600 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-800",
          error: "group-[.toaster]:border-red-500 group-[.toaster]:[--toast-icon-color:theme(colors.red.600)]",
          success: "group-[.toaster]:border-green-500 group-[.toaster]:[--toast-icon-color:theme(colors.green.600)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
