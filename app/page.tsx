import {
  CakeSliceIcon,
  EyeIcon,
  GlobeLockIcon,
  ShieldCheckIcon,
  Tally1Icon,
  Tally2Icon,
  Tally3Icon,
} from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto my-10 flex flex-col gap-20">
      {/* ----- HERO SECTION ----- */}
      <section className="flex min-h-[45vh] items-center justify-center rounded-2xl text-center">
        <div className="relative">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            height={350}
            width={350}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
          >
            <path
              fill="#FF0066"
              d="M46.4,-49.4C58,-34.7,64,-17.4,64,0C64,17.4,58.2,34.9,46.5,45.8C34.9,56.8,17.4,61.3,-2.9,64.1C-23.2,67,-46.3,68.2,-61.1,57.3C-75.9,46.3,-82.3,23.2,-80.4,1.9C-78.5,-19.4,-68.3,-38.7,-53.5,-53.4C-38.7,-68.1,-19.4,-78.1,-1,-77.1C17.4,-76.1,34.7,-64.1,46.4,-49.4Z"
              transform="translate(100 100)"
            />
          </svg>
          <h1 className="mb-4 text-4xl font-black">Gifting, Decentralized.</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Create, Share, and Redeem Gift Cards with Security and Ease. Built
            on AIA network.
          </p>
        </div>
      </section>
      {/* ----- ABOUT SECTION ----- */}
      <section className="flex justify-center">
        <blockquote className="w-[800px] max-w-full rounded-2xl border-l border-r p-10 text-center text-sm leading-relaxed">
          Xenia is a evm-based solution that brings secure, decentralized
          gifting to the blockchain. Perfect for personal gifting, promotions,
          and more, Xenia leverages IPFS metadata and hash-secured codes to
          offer a seamless and secure experience. Built on the AIA network,
          Xenia is transparent, low-cost, and easy to use.
        </blockquote>
      </section>
      {/* ----- FEATURES SECTION ----- */}
      <section className="flex flex-col justify-center gap-24">
        <div className="mx-auto flex w-[600px] max-w-full items-center gap-5">
          <span className="grow border-b border-dotted border-b-slate-500 dark:border-b-slate-300"></span>
          <h2 className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">
            Why Choose Xenia?
          </h2>
          <span className="grow border-b border-dotted border-b-slate-500 dark:border-b-slate-300"></span>
        </div>
        <div className="flex flex-col gap-16 md:grid md:grid-cols-2 md:grid-rows-2">
          {/* ITEM */}
          <div className="rounded-xl border border-slate-300 p-10 dark:border-slate-500">
            <div className="-mt-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-rose-50 dark:border-slate-500 dark:bg-rose-950">
              <ShieldCheckIcon className="h-10 w-10 text-rose-500 dark:text-rose-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold">Secure & Private</h3>
            <p>
              Your gift cards are protected with industry-leading encryption and
              IPFS metadata, ensuring complete security and authenticity.
            </p>
          </div>
          {/* ITEM */}
          <div className="rounded-xl border border-slate-300 p-10 dark:border-slate-500">
            <div className="-mt-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-rose-50 dark:border-slate-500 dark:bg-rose-950">
              <CakeSliceIcon className="h-10 w-10 text-rose-500 dark:text-rose-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold">
              Effortless Creation & Redemption
            </h3>
            <p>
              Easy-to-use features make creating and redeeming gift cards a
              seamless experience for both sender and recipient.
            </p>
          </div>
          {/* ITEM */}
          <div className="rounded-xl border border-slate-300 p-10 dark:border-slate-500">
            <div className="-mt-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-rose-50 dark:border-slate-500 dark:bg-rose-950">
              <GlobeLockIcon className="h-10 w-10 text-rose-500 dark:text-rose-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold">Decentralized</h3>
            <p>
              Built on the AIA network for a decentralized, transparent, and
              low-cost gifting solution.
            </p>
          </div>
          {/* ITEM */}
          <div className="rounded-xl border border-slate-300 p-10 dark:border-slate-500">
            <div className="-mt-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-rose-50 dark:border-slate-500 dark:bg-rose-950">
              <EyeIcon className="h-10 w-10 text-rose-500 dark:text-rose-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold">Transparent</h3>
            <p>
              All transactions are recorded on the AIA blockchain, ensuring
              transparency and accountability.
            </p>
          </div>
        </div>
      </section>
      {/* ----- HOW IT WORKS SECTION ----- */}
      <section className="flex flex-col justify-center gap-24">
        <div className="mx-auto flex w-[600px] max-w-full items-center gap-5">
          <span className="grow border-b border-dotted border-b-slate-500 dark:border-b-slate-300"></span>
          <h2 className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">
            How It Works
          </h2>
          <span className="grow border-b border-dotted border-b-slate-500 dark:border-b-slate-300"></span>
        </div>
        <div className="flex flex-col gap-16 md:grid md:grid-cols-3">
          {/* ITEM */}
          <div className="rounded-xl border border-slate-300 p-10 dark:border-slate-500">
            <div className="-mt-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-rose-50 dark:border-slate-500 dark:bg-rose-950">
              <Tally1Icon className="h-10 w-10 text-rose-500 dark:text-rose-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold">Create a Gift Card</h3>
            <p>
              Enter the amount, add metadata, and secure the code hash. Your
              card is created and ready to share.
            </p>
          </div>
          {/* ITEM */}
          <div className="rounded-xl border border-slate-300 p-10 dark:border-slate-500">
            <div className="-mt-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-rose-50 dark:border-slate-500 dark:bg-rose-950">
              <Tally2Icon className="h-10 w-10 text-rose-500 dark:text-rose-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold">Send to Recipient</h3>
            <p>
              Share the unique code with your recipient, either in person or
              securely online.
            </p>
          </div>
          {/* ITEM */}
          <div className="rounded-xl border border-slate-300 p-10 dark:border-slate-500">
            <div className="-mt-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-rose-50 dark:border-slate-500 dark:bg-rose-950">
              <Tally3Icon className="h-10 w-10 text-rose-500 dark:text-rose-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold">Redeem with Ease</h3>
            <p>
              The recipient enters the code to instantly redeem the funds to
              their wallet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
