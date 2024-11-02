export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          points: number;
          ev_registered: boolean;
          items_recycled: number;
        };
        Insert: {
          id: string;
          created_at?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          points?: number;
          ev_registered?: boolean;
          items_recycled?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          points?: number;
          ev_registered?: boolean;
          items_recycled?: number;
        };
      };
      recycling_centers: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          address: string;
          latitude: number;
          longitude: number;
          accepted_materials: string[];
          active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          address: string;
          latitude: number;
          longitude: number;
          accepted_materials: string[];
          active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          accepted_materials?: string[];
          active?: boolean;
        };
      };
      recycling_history: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          center_id: string;
          materials: string[];
          quantity: number;
          points_earned: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          center_id: string;
          materials: string[];
          quantity: number;
          points_earned: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          center_id?: string;
          materials?: string[];
          quantity?: number;
          points_earned?: number;
        };
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
  };
}
