// Database types for Supabase tables

export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    featured_image: string | null;
    category: string | null;
    tags: string[];
    published: boolean;
    published_at: string | null;
    reading_time: number;
    author_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: string;
    post_id: string;
    author_name: string;
    author_email: string;
    content: string;
    approved: boolean;
    created_at: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
}

export interface PostFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    category: string;
    tags: string[];
    published: boolean;
}

export interface CommentFormData {
    author_name: string;
    author_email: string;
    content: string;
}
