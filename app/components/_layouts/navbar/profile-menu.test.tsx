import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import type { User } from "~/lib/models/user.server";
import { renderWithRouter } from "~/test/render-with-router";
import ProfileMenu from "./profile-menu";

describe("ProfileMenu", () => {
  const baseUser: User = {
    id: 1,
    name: "Ícaro Harry",
    email: "icaro@example.com",
    github_id: "123",
    is_pro: true,
    github_user: "icaroharry",
    settings: null,
    avatar: {
      avatar_url: "https://example.com/avatar.jpg",
      name: "Ícaro Harry",
      badge: null,
      github_user: "icaroharry",
    },
  };

  it("shows a Meu Perfil link when the user has a github username", async () => {
    const user = userEvent.setup();

    renderWithRouter(() => <ProfileMenu user={baseUser} />);

    await user.click(screen.getByRole("button"));

    expect(
      screen.getByRole("menuitem", { name: "Meu Perfil" }),
    ).toHaveAttribute("href", "/perfil/icaroharry");
  });

  it("hides the Meu Perfil link when the user has no github username", async () => {
    const user = userEvent.setup();
    const userWithoutGithub = {
      ...baseUser,
      github_user: undefined,
      avatar: {
        ...baseUser.avatar,
        github_user: undefined,
      },
    };

    renderWithRouter(() => <ProfileMenu user={userWithoutGithub} />);

    await user.click(screen.getByRole("button"));

    expect(
      screen.queryByRole("menuitem", { name: "Meu Perfil" }),
    ).not.toBeInTheDocument();
  });
});
