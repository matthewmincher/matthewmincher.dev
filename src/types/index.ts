export interface SocialLink {
  link: string;
  label: string;
  icon: any; // FontAwesome icon type
}

export interface ContactData {
  professional: SocialLink[];
  personal: SocialLink[];
}

export interface LayoutProps {
  pageTitle: string;
  children: React.ReactNode;
}

export interface PageProps {
  location?: Location;
  pageContext?: any;
}
