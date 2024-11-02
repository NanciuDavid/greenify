"use client";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { FC, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
interface ProfileDialogProps {
  isOpen?: boolean;
  onClose: () => void;
}

const AddDialog: FC<ProfileDialogProps> = ({ isOpen, onClose }) => {
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const { toast } = useToast();
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-11/12 sm:max-w-md rounded-lg p-12">
        <AlertDialogHeader className="flex items-center">
          <h1 className="text-xl mb-10">Revendica credite folosing un cod!</h1>
          <VisuallyHidden.Root>
            <AlertDialogTitle></AlertDialogTitle>
          </VisuallyHidden.Root>
        </AlertDialogHeader>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center">
            <div>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="text-xs text-primary/50"></div>
          </div>
          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6"></dl>
          </div>
        </div>
        <AlertDialogFooter className="flex flex-row items-center justify-between gap-2">
          <Button
            className="w-full"
            variant="default"
            onClick={() => {
              onClose();
            }}
          >
            Add
          </Button>
          <AlertDialogCancel
            className="w-full m-0"
            onClick={() => {
              onClose();
            }}
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddDialog;
