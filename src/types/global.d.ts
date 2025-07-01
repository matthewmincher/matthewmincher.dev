declare module "*.scss" {
  const content: Record<string, string>;
  export = content;
}

declare module "*.css" {
  const content: Record<string, string>;
  export = content;
}

declare module "*.module.scss" {
  const classes: Record<string, string>;
  export = classes;
}

declare module "*.module.css" {
  const classes: Record<string, string>;
  export = classes;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "react-obfuscate" {
  interface ObfuscateProps {
    email?: string;
    tel?: string;
    href?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  const Obfuscate: React.FC<ObfuscateProps>;
  export default Obfuscate;
}
