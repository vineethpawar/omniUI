import { useCallback, useState } from "react";

export interface UseDisclosureProps {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (next: boolean) => void;
}

/**
 * Controlled-or-uncontrolled open/close state for menus, modals, drawers.
 * Used by every overlay primitive. Kept here in core because the logic is
 * identical on web and native.
 *
 * @example
 * const dialog = useDisclosure({ defaultOpen: false });
 * <button onClick={dialog.toggle}>Open</button>
 */
export function useDisclosure(props: UseDisclosureProps = {}): UseDisclosureReturn {
  const { defaultOpen = false, onOpenChange } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const setOpen = useCallback(
    (next: boolean) => {
      setIsOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  return { isOpen, open, close, toggle, setOpen };
}
