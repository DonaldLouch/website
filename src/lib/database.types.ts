export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      About: {
        Row: {
          avatar: string;
          bio: string;
          bioExcerpt: string;
          birthDate: string;
          city: string;
          country: string;
          currentAge: number;
          email: string;
          firstName: string;
          id: string;
          lastName: string;
          lastUpdatedOn: string;
          middleName: string;
          pronouns: string;
          province: string;
          tagLine: string;
        };
        Insert: {
          avatar: string;
          bio: string;
          bioExcerpt: string;
          birthDate: string;
          city: string;
          country: string;
          currentAge: number;
          email: string;
          firstName: string;
          id: string;
          lastName: string;
          lastUpdatedOn?: string;
          middleName: string;
          pronouns: string;
          province: string;
          tagLine: string;
        };
        Update: {
          avatar?: string;
          bio?: string;
          bioExcerpt?: string;
          birthDate?: string;
          city?: string;
          country?: string;
          currentAge?: number;
          email?: string;
          firstName?: string;
          id?: string;
          lastName?: string;
          lastUpdatedOn?: string;
          middleName?: string;
          pronouns?: string;
          province?: string;
          tagLine?: string;
        };
        Relationships: [];
      };
      BlogPost: {
        Row: {
          author: string;
          blogType: string;
          body: string;
          categories: string;
          excerpt: string;
          headingText: string | null;
          id: string;
          lastUpdatedOn: string;
          media: string | null;
          mediaCredit: string | null;
          pinned: boolean | null;
          postedOn: string;
          postStatus: string;
          sections: string | null;
          sidebar: boolean;
          slug: string;
          tags: string;
          thumbnail: string;
          title: string;
          views: number;
        };
        Insert: {
          author: string;
          blogType: string;
          body: string;
          categories: string;
          excerpt: string;
          headingText?: string | null;
          id: string;
          lastUpdatedOn?: string;
          media?: string | null;
          mediaCredit?: string | null;
          pinned?: boolean | null;
          postedOn?: string;
          postStatus: string;
          sections?: string | null;
          sidebar: boolean;
          slug: string;
          tags: string;
          thumbnail: string;
          title: string;
          views?: number;
        };
        Update: {
          author?: string;
          blogType?: string;
          body?: string;
          categories?: string;
          excerpt?: string;
          headingText?: string | null;
          id?: string;
          lastUpdatedOn?: string;
          media?: string | null;
          mediaCredit?: string | null;
          pinned?: boolean | null;
          postedOn?: string;
          postStatus?: string;
          sections?: string | null;
          sidebar?: boolean;
          slug?: string;
          tags?: string;
          thumbnail?: string;
          title?: string;
          views?: number;
        };
        Relationships: [];
      };
      Contact: {
        Row: {
          email: string;
          id: string;
          message: string;
          name: string;
          sentOn: string;
          subject: string;
        };
        Insert: {
          email: string;
          id: string;
          message: string;
          name: string;
          sentOn?: string;
          subject: string;
        };
        Update: {
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          sentOn?: string;
          subject?: string;
        };
        Relationships: [];
      };
      Embed: {
        Row: {
          addedOn: string;
          embedLink: string;
          id: string;
          lastUpdatedOn: string;
          link: string;
          note: string | null;
          options: string | null;
          orderNumber: number | null;
          title: string;
        };
        Insert: {
          addedOn?: string;
          embedLink: string;
          id: string;
          lastUpdatedOn?: string;
          link: string;
          note?: string | null;
          options?: string | null;
          orderNumber?: number | null;
          title: string;
        };
        Update: {
          addedOn?: string;
          embedLink?: string;
          id?: string;
          lastUpdatedOn?: string;
          link?: string;
          note?: string | null;
          options?: string | null;
          orderNumber?: number | null;
          title?: string;
        };
        Relationships: [];
      };
      Job: {
        Row: {
          budget: string | null;
          company: string | null;
          description: string;
          email: string;
          id: string;
          name: string;
          phone: string;
          sentOn: string;
          type: string;
        };
        Insert: {
          budget?: string | null;
          company?: string | null;
          description: string;
          email: string;
          id: string;
          name: string;
          phone: string;
          sentOn?: string;
          type: string;
        };
        Update: {
          budget?: string | null;
          company?: string | null;
          description?: string;
          email?: string;
          id?: string;
          name?: string;
          phone?: string;
          sentOn?: string;
          type?: string;
        };
        Relationships: [];
      };
      Links: {
        Row: {
          addedOn: string;
          clicks: number;
          iconName: string;
          iconPrefix: string;
          id: string;
          lastUpdatedOn: string;
          link: string | null;
          orderNumber: number | null;
          subTitle: string;
          title: string;
        };
        Insert: {
          addedOn?: string;
          clicks?: number;
          iconName: string;
          iconPrefix: string;
          id: string;
          lastUpdatedOn?: string;
          link?: string | null;
          orderNumber?: number | null;
          subTitle: string;
          title: string;
        };
        Update: {
          addedOn?: string;
          clicks?: number;
          iconName?: string;
          iconPrefix?: string;
          id?: string;
          lastUpdatedOn?: string;
          link?: string | null;
          orderNumber?: number | null;
          subTitle?: string;
          title?: string;
        };
        Relationships: [];
      };
      Media: {
        Row: {
          mediadescription: string | null;
          mediaDimensions: string;
          mediaExtension: string;
          mediaID: string;
          mediaKind: string;
          mediaPath: string;
          mediaPublicID: string;
          mediaSignature: string;
          mediaSize: number;
          mediaTitle: string;
          postedIn: string | null;
          uploadedOn: string;
        };
        Insert: {
          mediaDescription?: string | null;
          mediaDimensions: string;
          mediaExtension: string;
          mediaID: string;
          mediaKind: string;
          mediaPath: string;
          mediaPublicID: string;
          mediaSignature: string;
          mediaSize: number;
          mediaTitle: string;
          postedIn?: string | null;
          uploadedOn?: string;
        };
        Update: {
          mediaDescription?: string | null;
          mediaDimensions?: string;
          mediaExtension?: string;
          mediaID?: string;
          mediaKind?: string;
          mediaPath?: string;
          mediaPublicID?: string;
          mediaSignature?: string;
          mediaSize?: number;
          mediaTitle?: string;
          postedIn?: string | null;
          uploadedOn?: string;
        };
        Relationships: [];
      };
      Page: {
        Row: {
          id: string;
          lastUpdatedOn: string;
          orderNumber: number;
          pageStatus: string;
          slug: string;
          title: string;
          views: number;
        };
        Insert: {
          id: string;
          lastUpdatedOn?: string;
          orderNumber?: number;
          pageStatus: string;
          slug: string;
          title: string;
          views?: number;
        };
        Update: {
          id?: string;
          lastUpdatedOn?: string;
          orderNumber?: number;
          pageStatus?: string;
          slug?: string;
          title?: string;
          views?: number;
        };
        Relationships: [];
      };
      PinnedPosts: {
        Row: {
          addedOn: string;
          excerpt: string;
          id: string;
          lastUpdatedOn: string;
          orderNumber: number;
          postID: string;
          postSlug: string;
          postTitle: string;
          thumbnail: string;
        };
        Insert: {
          addedOn?: string;
          excerpt: string;
          id: string;
          lastUpdatedOn?: string;
          orderNumber: number;
          postID: string;
          postSlug: string;
          postTitle: string;
          thumbnail: string;
        };
        Update: {
          addedOn?: string;
          excerpt?: string;
          id?: string;
          lastUpdatedOn?: string;
          orderNumber?: number;
          postID?: string;
          postSlug?: string;
          postTitle?: string;
          thumbnail?: string;
        };
        Relationships: [];
      };
      PrimaryLinks: {
        Row: {
          addedOn: string;
          clicks: number;
          icon: string;
          id: string;
          lastUpdatedOn: string;
          link: string;
          orderNumber: number;
          subTitle: string;
          title: string;
        };
        Insert: {
          addedOn?: string;
          clicks?: number;
          icon: string;
          id: string;
          lastUpdatedOn?: string;
          link: string;
          orderNumber: number;
          subTitle: string;
          title: string;
        };
        Update: {
          addedOn?: string;
          clicks?: number;
          icon?: string;
          id?: string;
          lastUpdatedOn?: string;
          link?: string;
          orderNumber?: number;
          subTitle?: string;
          title?: string;
        };
        Relationships: [];
      };
      Resume: {
        Row: {
          address: string;
          avatar: string;
          bioExcerpt: string;
          currentAge: number;
          email: string;
          firstName: string;
          id: string;
          lastName: string;
          lastUpdatedOn: string;
          linkedin: string;
          middleName: string;
          phone: string;
          profile: string;
          pronouns: string;
          skills: string;
        };
        Insert: {
          address: string;
          avatar: string;
          bioExcerpt: string;
          currentAge: number;
          email: string;
          firstName: string;
          id: string;
          lastName: string;
          lastUpdatedOn?: string;
          linkedin: string;
          middleName: string;
          phone: string;
          profile: string;
          pronouns: string;
          skills: string;
        };
        Update: {
          address?: string;
          avatar?: string;
          bioExcerpt?: string;
          currentAge?: number;
          email?: string;
          firstName?: string;
          id?: string;
          lastName?: string;
          lastUpdatedOn?: string;
          linkedin?: string;
          middleName?: string;
          phone?: string;
          profile?: string;
          pronouns?: string;
          skills?: string;
        };
        Relationships: [];
      };
      ResumeEducation: {
        Row: {
          degree: string;
          description: string | null;
          endDate: number;
          id: string;
          school: string;
          startDate: number;
        };
        Insert: {
          degree: string;
          description?: string | null;
          endDate: number;
          id: string;
          school: string;
          startDate: number;
        };
        Update: {
          degree?: string;
          description?: string | null;
          endDate?: number;
          id?: string;
          school?: string;
          startDate?: number;
        };
        Relationships: [];
      };
      ResumeWorkExperience: {
        Row: {
          company: string;
          description: string;
          endDate: string | null;
          id: string;
          position: string;
          startDate: string;
        };
        Insert: {
          company: string;
          description: string;
          endDate?: string | null;
          id: string;
          position: string;
          startDate: string;
        };
        Update: {
          company?: string;
          description?: string;
          endDate?: string | null;
          id?: string;
          position?: string;
          startDate?: string;
        };
        Relationships: [];
      };
      ResumeWorkExperienceHistory: {
        Row: {
          description: string | null;
          endDate: string | null;
          id: string;
          position: string | null;
          resumeID: string;
          startDate: string | null;
        };
        Insert: {
          description?: string | null;
          endDate?: string | null;
          id: string;
          position?: string | null;
          resumeID: string;
          startDate?: string | null;
        };
        Update: {
          description?: string | null;
          endDate?: string | null;
          id?: string;
          position?: string | null;
          resumeID?: string;
          startDate?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
