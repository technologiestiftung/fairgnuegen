import { ReactNode } from "react";
import { Header } from "../components/header/header";
import { Main } from "../components/main/main";
import { Footer } from "../components/footer/footer";

export function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />

			<Main>{children}</Main>

			<Footer></Footer>
		</>
	);
}
