import { useCallback, useState } from "react";

export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  set: (next: boolean) => void;
}

/**
 * Boolean state with named setters. Pairs well with Modal, Dropdown, Drawer.
 *
 *   const { isOpen, open, close, toggle } = useDisclosure();
 */
export function useDisclosure(initial = false): UseDisclosureReturn {
  const [isOpen, setOpen] = useState<boolean>(initial);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const set = useCallback((next: boolean) => setOpen(next), []);
  return { isOpen, open, close, toggle, set };
}
