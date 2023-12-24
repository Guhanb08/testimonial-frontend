export interface loginInput {
  email : string;
  password : string;
}

export interface registerInput {
  user_name : string
  email : string;
  password : string;
}

export interface spaceInput {
  user_name : string
  email : string;
  password : string;
}


export interface space {
  id: number;
  space_name: string;
  space_setting: space_setting[];
  user_id : number;
}

export interface space_setting {
  user_name: string;
  email: string;
  password: string;
  logo?: string;
  logo_type?: boolean;
  url?: string;
  header_title?: string;
  message?: string;
  collection_type?: string;
  collect_star?: boolean;
  theme?: boolean;
  custom_color?: string;
  language?: string;
  video_duration?: number;
  maxtext_length?: number;
  videobutton_text?: string;
  textbutton_text?: string;
  display_contest?: string;
  contest_link?: string;
  question_label?: string;
  apply_watermark?: boolean;
  watermark_image?: string;
  watermark_position?: string;
  testimonial_avatar?: string;
  affliated_link?: string;
  show_testimonials?: boolean;
  thirdparty?: string;
  thirdparty_link?: string;
  autopopulate_walloflove?: boolean;
  disable_videorecord?: boolean;
  space_questions: space_questions[];

}

export type space_questions = {
  id: string;
  question?: string;
}


