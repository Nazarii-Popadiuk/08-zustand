import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NoteDraft = {
    title: string;
    content: string;
    tag: string;
}

type NoteDraftStore = {
  draft: NoteDraft;
  setDraft: (note: NoteDraft) => void;
  clearDraft: () => void;
};

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(persist((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}), {
  name: 'note-draft',
  partialize: (state) => ({ draft: state.draft })
}));
