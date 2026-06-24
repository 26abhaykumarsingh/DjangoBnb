"use client";

import CustomButton from "@/app/components/forms/CustomButton";
import Modal from "@/app/components/modals/Modal";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {
  const loginModal = useLoginModal();

  const content = (
    <>
      <form className="space-y-4">
        <input
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <div className="p-4 bg-airbnb text-white rounded-xl opacity-80">
          The error message
        </div>

        <CustomButton label="Submit" onClick={() => console.log("Test")} />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
