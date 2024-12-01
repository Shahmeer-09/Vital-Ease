"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
let access = typeof(window)!== 'undefined' && window.localStorage.getItem("access");
export function OTPDialogue() {
 
  const router = useRouter();
  const [key, setKey] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const decryptedKey = access && decryptKey(access);
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (key === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      const encryptedkey = encryptKey(key);
      localStorage.setItem("access", encryptedkey);
      setOpen(false);
      router.push("/admin");
    } else {
      setKey("");
      setError("Invalid key try again");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {decryptedKey ? (
          <p
            className=" text-green-500 text-[16px] cursor-pointer "
            onClick={() => {
              router.push("/admin");
            }}
          >
            Admin
          </p>
        ) : (
          <p
            onClick={() => {
              setOpen(true);
              setKey("");
            }}
            className=" text-green-500 text-[16px] cursor-pointer "
          >
            Admin
          </p>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800 border-none ">
        <DialogHeader>
          <DialogTitle>Admin Verification</DialogTitle>
          <DialogDescription className="opacity-45">
            To access the admin page enter passkey
          </DialogDescription>
        </DialogHeader>
        <div>
          <InputOTP
            value={key}
            onChange={(value) => setKey(value)}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup className=" w-full my-4 flex justify-between  ">
              <InputOTPSlot
                className=" border text-[22px] flex  justify-center font-bold border-zinc-700  size-12 rounded-lg "
                index={0}
              />
              <InputOTPSlot
                className=" border text-[22px] flex  justify-center font-bold border-zinc-700  size-12 rounded-lg "
                index={1}
              />
              <InputOTPSlot
                className=" border text-[22px] flex  justify-center font-bold border-zinc-700  size-12 rounded-lg "
                index={2}
              />
              <InputOTPSlot
                className=" border text-[22px] flex  justify-center font-bold border-zinc-700  size-12 rounded-lg "
                index={3}
              />
              <InputOTPSlot
                className=" border text-[22px] flex  justify-center font-bold border-zinc-700  size-12 rounded-lg "
                index={4}
              />
              <InputOTPSlot
                className=" border text-[22px] flex  justify-center font-bold border-zinc-700  size-12 rounded-lg "
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && <p className=" text-red-500 text-[12px] ">{error}</p>}
        <DialogFooter>
          <Button
            onClick={(e) => onSubmit(e)}
            type="submit"
            variant={"outline"}
          >
            Enter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
