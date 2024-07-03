import React from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface AvatarComponentProps {
  src: string;
  alt: string;
  fallbackText: string;
}

export const AvatarComponent: React.FC<AvatarComponentProps> = ({ src, alt, fallbackText }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};

interface AccordionComponentProps {
  data: {
    title: string;
    description: string;
  }[];
}

export const AccordionComponent: React.FC<{ data: AccordionComponentProps['data'] }> = ({ data }) => {
  return (
    <BaseAccordion type="single" collapsible className="w-full">
      {data.map((item, index) => {
        return (
          <AccordionItem key={index} value={`item-${index.toFixed()}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        );
      })}
    </BaseAccordion>
  );
};

interface TooltipComponentProps {
  children: React.ReactNode;
}

export const TooltipComponent: React.FC<TooltipComponentProps> = ({ children }) => {
  const trigger = React.Children.toArray(children).find(child => React.isValidElement(child) && child.props['data-tooltip'] === "trigger");
  const content = React.Children.toArray(children).find(child => React.isValidElement(child) && child.props['data-tooltip'] === "content");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
