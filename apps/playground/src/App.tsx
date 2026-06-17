/**
 * plyxui playground — a SaaS-style dashboard built end-to-end with
 * @plyxui/*. Pull it apart, swap components in, change the theme tokens.
 * Nothing here is bespoke: every piece comes from a published package.
 *
 *   ThemeProvider + ToastProvider → wrappers (see main.tsx)
 *   AppShell + Sidebar            → layouts
 *   Box, Text, Stack, Input,      → primitives
 *   Button
 *   Field, Select, Checkbox,      → forms
 *   Radio, RadioGroup
 *   Modal, Tabs, Tooltip,         → comps
 *   Toaster, Drawer
 *   useTheme, useMediaQuery,      → hooks / styles
 *   useToast, useDisclosure
 */
import { useState } from "react";
import { useTheme } from "@plyxui/styles";
import { useMediaQuery, useToast, useDisclosure } from "@plyxui/hooks";
import { AppShell, Sidebar } from "@plyxui/layouts";
import { Box, Text, Stack, Flex, Input, Button } from "@plyxui/primitives";
import { Field, Select, Checkbox, Radio, RadioGroup } from "@plyxui/forms";
import { Modal, Tabs, TabList, Tab, TabPanel, Tooltip, Toaster, Drawer } from "@plyxui/comps";

const NAV_ITEMS = [
  { label: "Home", icon: "home", key: "home" },
  { label: "Members", icon: "users", key: "members" },
  { label: "Settings", icon: "settings", key: "settings" },
  { label: "Billing", icon: "credit-card", key: "billing" },
];

export function App() {
  const { mode, toggleTheme, colors } = useTheme();
  const isWide = useMediaQuery("(min-width: 900px)");
  const mobileNav = useDisclosure(false);
  const [active, setActive] = useState("home");

  // The sidebar lives in the shell on desktop; on mobile it goes into a Drawer.
  const sidebarItems = NAV_ITEMS.map((it) => ({
    label: it.label,
    icon: it.icon,
    active: it.key === active,
    onSelect: () => {
      setActive(it.key);
      mobileNav.close();
    },
  }));

  const SidebarBlock = (
    <Sidebar
      items={sidebarItems}
      header={
        <Flex align="center" gap={2} style={{ padding: 8, marginBottom: 4 }}>
          <BrandMark />
          <Text size="md" weight="semibold">plyxui</Text>
        </Flex>
      }
      footer={
        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: `1px solid ${colors.stroke}`,
            color: colors.textMuted,
            borderRadius: 8,
            padding: "8px 12px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 13,
          }}
        >
          {mode === "dark" ? "☀ Light mode" : "☾ Dark mode"}
        </button>
      }
    />
  );

  return (
    <>
      <AppShell
        sidebar={isWide ? SidebarBlock : undefined}
        sidebarWidth={232}
        header={
          <Header
            title={NAV_ITEMS.find((n) => n.key === active)?.label ?? "Home"}
            onMenuClick={mobileNav.open}
            showMenu={!isWide}
          />
        }
      >
        <Box style={{ padding: isWide ? 32 : 20, background: colors.primaryFill, minHeight: "100%" }}>
          <Stack direction="vertical" gap={5}>
            <StatRow />
            <DashboardGrid />
          </Stack>
        </Box>
      </AppShell>

      <Drawer open={mobileNav.isOpen} onClose={mobileNav.close} side="left" size={264}>
        {SidebarBlock}
      </Drawer>

      <Toaster position="bottom-right" />
    </>
  );
}

function BrandMark() {
  // The 3x3 dot matrix that lives across plyxui.com — a stable scale-free icon.
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      {[4, 12, 20].flatMap((cy) =>
        [4, 12, 20].map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill={cx === 12 && cy === 12 ? "#FF5C00" : "currentColor"} />
        )),
      )}
    </svg>
  );
}

function Header({ title, onMenuClick, showMenu }: { title: string; onMenuClick: () => void; showMenu: boolean }) {
  const { colors, mode, toggleTheme } = useTheme();
  return (
    <Flex
      align="center"
      justify="between"
      style={{
        padding: "12px 20px",
        background: colors.surfaceFill,
        borderBottom: `1px solid ${colors.stroke}`,
        height: 56,
      }}
    >
      <Flex align="center" gap={3}>
        {showMenu && (
          <button
            onClick={onMenuClick}
            aria-label="Open navigation"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 8,
              color: colors.text,
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            ≡
          </button>
        )}
        <Text size="lg" weight="semibold">{title}</Text>
      </Flex>
      <Flex align="center" gap={3}>
        <Tooltip label="Toggle theme">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: "transparent",
              border: `1px solid ${colors.stroke}`,
              borderRadius: 8,
              cursor: "pointer",
              padding: 6,
              width: 32,
              height: 32,
              display: "grid",
              placeItems: "center",
              color: colors.text,
              fontSize: 14,
            }}
          >
            {mode === "dark" ? "☀" : "☾"}
          </button>
        </Tooltip>
        <Box
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: colors.primaryOrange,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          VP
        </Box>
      </Flex>
    </Flex>
  );
}

function StatRow() {
  const stats = [
    { label: "Total users", value: "142", delta: "+18 this week", positive: true },
    { label: "New sign-ups", value: "28", delta: "+4 today", positive: true },
    { label: "Paid plans", value: "7", delta: "−1 vs last week", positive: false },
  ];
  return (
    <Stack direction="horizontal" gap={4} style={{ flexWrap: "wrap" }}>
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </Stack>
  );
}

function StatCard({ label, value, delta, positive }: { label: string; value: string; delta: string; positive: boolean }) {
  const { colors } = useTheme();
  return (
    <Box
      style={{
        flex: "1 1 200px",
        minWidth: 180,
        padding: 20,
        background: colors.surfaceFill,
        border: `1px solid ${colors.stroke}`,
        borderRadius: 12,
      }}
    >
      <Text size="xs" weight="medium" style={{ color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </Text>
      <Text size="xl" weight="bold" style={{ fontSize: 32, marginTop: 6, marginBottom: 4 }}>
        {value}
      </Text>
      <Text size="sm" style={{ color: positive ? colors.statusSuccess : colors.statusError }}>
        {delta}
      </Text>
    </Box>
  );
}

function DashboardGrid() {
  const isWide = useMediaQuery("(min-width: 900px)");
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isWide ? "1.4fr 1fr" : "1fr",
        gap: 20,
        alignItems: "start",
      }}
    >
      <CreateMemberCard />
      <CompsShowcase />
    </div>
  );
}

function CreateMemberCard() {
  const { colors } = useTheme();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("pro");
  const [sendInvite, setSendInvite] = useState(true);
  const [role, setRole] = useState<"user" | "admin">("user");

  return (
    <Box style={{ padding: 24, background: colors.surfaceFill, border: `1px solid ${colors.stroke}`, borderRadius: 12 }}>
      <Text size="md" weight="semibold" style={{ marginBottom: 4 }}>Create member</Text>
      <Text size="sm" style={{ color: colors.textMuted, marginBottom: 20 }}>
        Every input below is from @plyxui/primitives or @plyxui/forms.
      </Text>

      <Stack direction="vertical" gap={4}>
        <Field label="Full name" required>
          <Input value={name} onChange={setName} placeholder="Anika Patel" />
        </Field>
        <Field label="Email" helper="They'll get an invite if the box below is checked.">
          <Input type="email" value={email} onChange={setEmail} placeholder="anika@example.com" />
        </Field>
        <Field label="Plan">
          <Select
            value={plan}
            onChange={setPlan}
            options={[
              { value: "free", label: "Free" },
              { value: "pro", label: "Pro" },
              { value: "team", label: "Team" },
            ]}
          />
        </Field>
        <Checkbox checked={sendInvite} onChange={setSendInvite} label="Send invite email" />
        <Field label="Role">
          <RadioGroup value={role} onChange={(v) => setRole(v as "user" | "admin")}>
            <Stack direction="horizontal" gap={5}>
              <Radio value="user" label="User" />
              <Radio value="admin" label="Admin" />
            </Stack>
          </RadioGroup>
        </Field>

        <Flex gap={2} justify="end" style={{ marginTop: 8 }}>
          <Button variant="ghost" onClick={() => { setName(""); setEmail(""); }}>Reset</Button>
          <Button
            variant="primary"
            onClick={() => {
              toast({
                title: name ? `Invited ${name}` : "Invited new member",
                description: `Role: ${role}, plan: ${plan}.`,
                variant: "success",
              });
            }}
          >
            Save member
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}

function CompsShowcase() {
  const { colors } = useTheme();
  const modal = useDisclosure(false);
  const { toast } = useToast();
  const [tab, setTab] = useState("activity");

  return (
    <Box style={{ padding: 24, background: colors.surfaceFill, border: `1px solid ${colors.stroke}`, borderRadius: 12 }}>
      <Text size="md" weight="semibold" style={{ marginBottom: 4 }}>Quick actions</Text>
      <Text size="sm" style={{ color: colors.textMuted, marginBottom: 16 }}>
        Modal, Toast, Tabs, Tooltip — all from @plyxui/comps.
      </Text>

      <Stack direction="horizontal" gap={2} style={{ marginBottom: 20, flexWrap: "wrap" }}>
        <Button variant="primary" onClick={modal.open}>Open modal</Button>
        <Button variant="ghost" onClick={() => toast({ title: "Heads up", description: "This is a Toaster from @plyxui/comps.", variant: "default" })}>
          Fire a toast
        </Button>
        <Tooltip label="Hover me — this is a Tooltip" side="bottom">
          <Button variant="ghost">Hover me</Button>
        </Tooltip>
      </Stack>

      <Tabs value={tab} onChange={setTab}>
        <TabList>
          <Tab value="activity">Activity</Tab>
          <Tab value="invites">Invites</Tab>
          <Tab value="usage">Usage</Tab>
        </TabList>
        <TabPanel value="activity">
          <Text size="sm" style={{ color: colors.textMuted }}>Anika joined · 2m ago</Text><br/>
          <Text size="sm" style={{ color: colors.textMuted }}>Karim upgraded to Pro · 14m ago</Text><br/>
          <Text size="sm" style={{ color: colors.textMuted }}>Liu invited 3 members · 1h ago</Text>
        </TabPanel>
        <TabPanel value="invites">
          <Text size="sm" style={{ color: colors.textMuted }}>2 invites still pending. Resend from the Members page.</Text>
        </TabPanel>
        <TabPanel value="usage">
          <Text size="sm" style={{ color: colors.textMuted }}>72% of seats in use this billing cycle.</Text>
        </TabPanel>
      </Tabs>

      <Modal
        open={modal.isOpen}
        onClose={modal.close}
        title="Confirm action"
        description="This Modal is straight from @plyxui/comps."
        footer={
          <>
            <Button variant="ghost" onClick={modal.close}>Cancel</Button>
            <Button variant="primary" onClick={() => { modal.close(); toast({ title: "Confirmed", variant: "success" }); }}>
              Confirm
            </Button>
          </>
        }
      >
        <Text size="sm">Replace this body with any JSX. The Modal handles scroll lock, focus, and Escape.</Text>
      </Modal>
    </Box>
  );
}
