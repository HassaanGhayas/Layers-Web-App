"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const BreadCrumb = ({ additional }: { additional?: string | null }) => {
  const pathname = usePathname()
    .split("/")
    .filter((path) => path !== "");

  // pathname.push(
  //   additional
  //     ? additional.lastIndexOf("s") === additional.length - 1
  //       ? additional.split("")[0].toUpperCase() + additional.slice(1)
  //       : additional.split("")[0].toUpperCase() + additional.slice(1) + "s"
  //     : "All Products"
  // );

  if (additional)
    pathname.push(
      additional.lastIndexOf("s") === additional.length - 1
        ? additional.split("")[0].toUpperCase() + additional.slice(1)
        : additional.split("")[0].toUpperCase() + additional.slice(1) + "s"
    );

  return (
    <Breadcrumb className="pt-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${path}`}>
                {(path.split("")[0].toUpperCase() + path.slice(1)).length > 16
                  ? path.charAt(0).toUpperCase() + path.slice(1, 10) + "..."
                  : path.charAt(0).toUpperCase() + path.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// additional.split("")[0].toUpperCase() + additional.slice(1)

export default BreadCrumb;
