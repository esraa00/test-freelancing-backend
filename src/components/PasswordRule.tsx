import { CheckMarkIcon, CrossMarkIcon } from "./icons";

interface PasswordRuleProps {
  fulfilled: boolean;
  requirement: { label: string; name: string };
}

export default function PasswordRule({
  requirement,
  fulfilled,
}: PasswordRuleProps) {
  const Icon = fulfilled ? CheckMarkIcon : CrossMarkIcon;
  return (
    <li className="flex">
      <Icon />
      <span>{requirement.label}</span>
    </li>
  );
}
