import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cn } from "@/lib/utils";
import { PLANS } from "@/config/stripe";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import { TooltipContent } from "@/components/ui/tooltip";
import UpgradeButton from "@/components/UpgradeButton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  const pricingItems = [
    {
      plan: "Demo",
      tagline: "Let's get started with a Demo enviorment",
      quota: "5 demo",
      features: [
        {
          text: "5 Demo accounts",
          footnote: "Use the 5 accounts to see the offboarding process",
        },
        {
          text: "1 Administrator account",
        },
        {
          text: "Transfer Google account data",
          footnote: "Transfer includes; Drive, Calendar, Looker Studio",

          negative: true,
        },
        {
          text: "Google Workspace connection",
          negative: true,
        },
        {
          text: "Google Vault exports",
          footnote: "Automatically export gmail inboxes to Google Vault",
          negative: true,
        },
        {
          text: "Archiving Exports to GCS",
          footnote:
            "Enables you to export your vault exports to Google Cloud Storage",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "For larger projects with higher needs.",
      quota: PLANS.find((p) => p.slug === "pro")!.quota,
      features: [
        {
          text: "Unlimited account migration",
          footnote:
            "Simply configure an Google Workspace API key and your all set",
        },
        {
          text: "5 Team members",
          footnote: "More team members can be added for €20 p/y",
        },
        {
          text: "Transfer Google account data",
          footnote: "Transfer includes; Drive, Calendar, Looker Studio",
        },
        {
          text: "Google Workspace connection",
          footnote:
            "Simply configure an Google Workspace API key and your all set",
        },

        {
          text: "Google Vault exports",
          footnote: "Automatically export gmail inboxes to Google Vault",
        },
        {
          text: "Archiving Exports to GCS",
          footnote:
            "Enables you to export your vault exports to Google Cloud Storage",
        },
      ],
    },
  ];
  return (
    <>
      <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
          <p className="mt-5 text-gray-600 sm:text-lg">
            Wheter you need a monthly or annual subscription, we&apos;ve got you
            covered.
          </p>
        </div>
        <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, quota, features }) => {
              const price =
                PLANS.find((p) => p.slug === plan.toLowerCase())?.price
                  .amount || 0;
              return (
                <div
                  key={plan}
                  className={cn("relative rounded-2xl bg-white shadow-lg", {
                    "border-2 border-blue-600 shadow-blue-200": plan === "Pro",
                    "border border-gray-200": plan !== "Pro",
                  })}
                >
                  {plan === "Pro" && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                      Upgrade now
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="my-3 text-center font-display text-3xl font-bold">
                      {plan}
                    </h3>
                    <p className="text-gray-500">{tagline}</p>
                    <p className="my-5 font-display text-6xl font-semibold">
                      €{price}
                    </p>
                    <p className="text-gray-500">per year</p>
                  </div>
                  <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-1">
                      <p>{quota.toLocaleString()} accounts/mo included</p>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger className="cursor-default ml-1.5">
                          <HelpCircle className="h-4 w-4 text-zinc-500" />
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-2">
                          How many accounts you can process
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <ul className="my-10 space-y-5 px-8">
                    {features.map(({ text, footnote, negative }) => (
                      <li key={text} className="flex space-x-5">
                        <div className="flex-shrink-0">
                          {negative ? (
                            <Minus className="h-6 w-6 text-gray-300" />
                          ) : (
                            <Check className="h-6 w-6 text-blue-500" />
                          )}
                        </div>
                        {footnote ? (
                          <div className="flex items-center space-x-1">
                            <p
                              className={cn("text-gray-400", {
                                "text-gray-600": negative,
                              })}
                            >
                              {text}
                            </p>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className="cursor-default ml-1.5">
                                <HelpCircle className="h-4 w-4 text-zinc-500" />
                              </TooltipTrigger>
                              <TooltipContent className="w-80 p-2">
                                {footnote}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p
                            className={cn("text-gray-400", {
                              "text-gray-600": negative,
                            })}
                          >
                            {text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200" />
                  <div className="p-5">
                    {plan === "Demo" ? (
                      <Link
                        href={user ? "/dashboard" : "/sign-in"}
                        className={buttonVariants({
                          className: "w-full",
                          variant: "secondary",
                        })}
                      >
                        {user ? "Upgrade now" : "Sign up"}
                        <ArrowRight className="h-5 w-5 ml-1.5" />
                      </Link>
                    ) : user ? (
                      <UpgradeButton />
                    ) : (
                      <Link
                        href="/sign-in"
                        className={buttonVariants({
                          className: "w-full",
                        })}
                      >
                        {user ? "Upgrade now" : "Sign up"}
                        <ArrowRight className="h-5 w-5 ml-1.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
