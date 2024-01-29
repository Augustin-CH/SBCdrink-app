export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ingredient: {
        Row: {
          alcohol_degree: number
          created_at: string
          id: number
          is_alcohol: boolean
          name: string
          updated_at: string | null
        }
        Insert: {
          alcohol_degree: number
          created_at?: string
          id?: number
          is_alcohol: boolean
          name: string
          updated_at?: string | null
        }
        Update: {
          alcohol_degree?: number
          created_at?: string
          id?: number
          is_alcohol?: boolean
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      machine_configuration: {
        Row: {
          id: number
          ingredient: number | null
          measure_volume: number | null
          slot: number
        }
        Insert: {
          id?: number
          ingredient?: number | null
          measure_volume?: number | null
          slot: number
        }
        Update: {
          id?: number
          ingredient?: number | null
          measure_volume?: number | null
          slot?: number
        }
        Relationships: [
          {
            foreignKeyName: 'machine_configuration_ingredient_fkey'
            columns: ['ingredient']
            isOneToOne: false
            referencedRelation: 'ingredient'
            referencedColumns: ['id']
          }
        ]
      }
      order: {
        Row: {
          alcohol_level: number
          created_at: string
          id: number
          progress: number
          recipe_name: string
          status: Database['public']['Enums']['status']
        }
        Insert: {
          alcohol_level?: number
          created_at?: string
          id?: number
          progress?: number
          recipe_name: string
          status?: Database['public']['Enums']['status']
        }
        Update: {
          alcohol_level?: number
          created_at?: string
          id?: number
          progress?: number
          recipe_name?: string
          status?: Database['public']['Enums']['status']
        }
        Relationships: []
      }
      order_ingredient_step: {
        Row: {
          created_at: string
          id: number
          ingredient_alcohol_degree: number
          ingredient_is_alcohol: boolean
          ingredient_name: string
          order: number
          quantity: number
          status: Database['public']['Enums']['status']
        }
        Insert: {
          created_at?: string
          id?: number
          ingredient_alcohol_degree: number
          ingredient_is_alcohol: boolean
          ingredient_name: string
          order: number
          quantity: number
          status?: Database['public']['Enums']['status']
        }
        Update: {
          created_at?: string
          id?: number
          ingredient_alcohol_degree?: number
          ingredient_is_alcohol?: boolean
          ingredient_name?: string
          order?: number
          quantity?: number
          status?: Database['public']['Enums']['status']
        }
        Relationships: [
          {
            foreignKeyName: 'order_ingredient_step_order_fkey'
            columns: ['order']
            isOneToOne: false
            referencedRelation: 'order'
            referencedColumns: ['id']
          }
        ]
      }
      recipe: {
        Row: {
          alcohol_level: number
          alcohol_max_level: number
          alcohol_min_level: number
          created_at: string
          description: string | null
          id: number
          is_available: boolean
          name: string
          picture: string | null
          updated_at: string | null
        }
        Insert: {
          alcohol_level?: number
          alcohol_max_level?: number
          alcohol_min_level?: number
          created_at?: string
          description?: string | null
          id?: number
          is_available?: boolean
          name: string
          picture?: string | null
          updated_at?: string | null
        }
        Update: {
          alcohol_level?: number
          alcohol_max_level?: number
          alcohol_min_level?: number
          created_at?: string
          description?: string | null
          id?: number
          is_available?: boolean
          name?: string
          picture?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recipe_ingredient: {
        Row: {
          id: number
          ingredient: number
          order_index: number
          proportion: number
          recipe: number
        }
        Insert: {
          id?: number
          ingredient: number
          order_index: number
          proportion: number
          recipe: number
        }
        Update: {
          id?: number
          ingredient?: number
          order_index?: number
          proportion?: number
          recipe?: number
        }
        Relationships: [
          {
            foreignKeyName: 'recipe_ingredient_ingredient_fkey'
            columns: ['ingredient']
            isOneToOne: false
            referencedRelation: 'ingredient'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'recipe_ingredient_recipe_fkey'
            columns: ['recipe']
            isOneToOne: false
            referencedRelation: 'recipe'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_order_and_step: {
        Args: {
          p_recipe_name: string
          p_alcohol_level: number
          p_steps: Json
        }
        Returns: Array<{
          order_id: number
          step_ids: number[]
        }>
      }
    }
    Enums: {
      status: 'created' | 'in_progress' | 'done' | 'canceled'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: Array<{
          size: number
          bucket_id: string
        }>
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: Array<{
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (Database['public']['Tables'] & Database['public']['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
  Database['public']['Views'])
    ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof Database['public']['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof Database['public']['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof Database['public']['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
