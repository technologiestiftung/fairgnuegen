import { Suspense } from "react";
import { useLanguage } from "../../hooks/use-language";
import { Layout } from "../../layout/layout";

export default function PrivacyNote() {
	const language = useLanguage();

	const styledLink = (link: string, text: string) => (
		<a
			href={link}
			className="hover:cursor-pointer hover:underline text-[#0047D3]"
		>
			{text}
		</a>
	);

	if (language === "en") {
		return (
			<Layout>
				<Suspense fallback={<div className="w-svw h-svh" />}>
					<div className="max-w-4xl flex flex-col mx-auto px-4 lg:px-0">
						<h1 className="text-2xl font-bold w-full flex flex-row my-8">
							Data Privacy
						</h1>
						<p className="mb-8">
							Please refer to the{" "}
							{styledLink("/privacy-note/", "German version")}.
						</p>
					</div>
				</Suspense>
			</Layout>
		);
	}

	return (
		<Layout>
			<Suspense fallback={<div className="w-svw h-svh" />}>
				<div className="max-w-4xl flex flex-col mx-auto px-4 lg:px-0 pb-8">
					<h1 className="text-3xl font-bold w-full flex flex-row my-8">
						Datenschutzerklärung
					</h1>
					<ol className="flex flex-col gap-16">
						<li>
							<h2 className="text-2xl font-bold mb-4">
								1. Allgemeine Informationen
							</h2>
							<ol className="flex flex-col gap-8">
								<li>
									<h3 className="text-2xl font-bold mb-4">
										1.1 Zweck der Datenschutzerklärung
									</h3>
									<div className="flex flex-col gap-4">
										<div>
											Die Datenschutzerklärung soll Sie über Art, Umfang und
											Zweck der von der Technologiestiftung Berlin erhobenen,
											genutzten und verarbeitenden Daten sowie Ihre Rechte in
											Bezug auf Datenschutz informieren. Die Technologiestiftung
											Berlin ist sich der Verantwortung für den Schutz von
											personenbezogenen Daten bewusst und setzt sich besonders
											dafür ein, dass Ihre Privatsphäre geschützt wird.
										</div>
										<div>
											Personenbezogene Daten im Sinne der
											Datenschutz-Grundverordnung (DSGVO – Verordnung (EU)
											2016/679) sind alle Informationen, anhand derer eine
											Person eindeutig identifizierbar ist. Im Zuge der
											Anwendung der DSGVO ab dem 25. Mai 2018 hat die
											Technologiestiftung Berlin zahlreiche Maßnahmen umgesetzt,
											um den Schutz Ihrer Daten zu gewährleisten und eine
											Nutzung nach einer Abwägung der Eigeninteressen zu
											minimieren.
										</div>
									</div>
								</li>
								<li>
									<h3 className="text-2xl font-bold mb-4">
										1.2 Verantwortliche{" "}
									</h3>
									<div className="flex flex-col gap-4">
										<div>
											Die Verantwortliche im Sinne der DSGVO, sonstiger in den
											Mitgliedstaaten der Europäischen Union geltenden
											Datenschutzgesetze und anderer Bestimmungen mit
											datenschutzrechtlichem Charakter ist die
											Technologiestiftung Berlin.
										</div>
										<div className="flex flex-col gap-0">
											<p>Technologiestiftung Berlin</p>
											<p>Grunewaldstraße 61-62</p>
											<p>10825 Berlin Deutschland </p>
											<p>Tel.: 030 20 96 99 90 </p>
											<p>
												E-Mail:{" "}
												{styledLink(
													"mailto:info@technologiestiftung-berlin.de",
													"info@technologiestiftung-berlin.de",
												)}
											</p>
											<p>
												Website:{" "}
												{styledLink(
													"https://www.technologiestiftung-berlin.de",
													"www.technologiestiftung-berlin.de",
												)}
											</p>
										</div>
										<div>
											Für Anfragen und Auskünfte zum Datenschutz erreichen Sie
											unseren Datenschutzbeauftragten unter:
										</div>
										<div className="flex flex-col gap-0">
											<p>Michael Scherer </p>
											<p>Technologiestiftung Berlin </p>
											<p>Grunewaldstraße 61-62 </p>
											<p>10825 Berlin Deutschland </p>
											<p>Tel.: 030 20 96 99 951 </p>
											<p>
												E-Mail:{" "}
												{styledLink(
													"mailto:info@technologiestiftung-berlin.de",
													"info@technologiestiftung-berlin.de",
												)}
											</p>
										</div>
									</div>
								</li>
								<li>
									<h3 className="text-2xl font-bold mb-4">
										1.3 Allgemeine Zweckbestimmung der Datenerhebung,
										-verarbeitung und -nutzung
									</h3>
									<div className="flex flex-col gap-4">
										<div>
											Die Technologiestiftung Berlin ist eine rechtsfähige
											gemeinnützige Stiftung bürgerlichen Rechts. Im Rahmen der
											Tätigkeiten der Stiftung ist es notwendig,
											personenbezogene Daten zu handhaben. Personenbezogene
											Daten werden für die folgenden Zwecke erhoben, verarbeitet
											und genutzt:
										</div>

										<ul className="flex flex-col ml-8 list-disc">
											<li>
												Informationen über die Technologiestiftung und
												Einladungen zu Aktivitäten der Technologiestiftung
											</li>
											<li>
												Geschäftspartner*innen- und Interessent*innenbetreuung
											</li>
											<li>Personalmanagement</li>
											<li>internes und externes Rechnungswesen</li>
											<li>
												Beantragung und Bewirtschaftung von öffentlichen und
												privaten Mitteln
											</li>
											<li>Bewirtschaftung eigener Projektförderungen</li>
										</ul>
										<div>
											Dabei kann es dazu kommen, dass die Daten im Rahmen der
											gesetzlichen Vorgaben an Dritte zur Verarbeitung
											weitergegeben werden, da ein berechtigtes Interesse oder
											eine Verpflichtung besteht. Dies können folgende Dritte
											sein:
										</div>
										<ul className="flex flex-col ml-8 list-disc">
											<li>
												Dienstleister*innen zur Auftragsverarbeitung nach Art.
												29 und Art. 6 Abs1 a und f DSGVO
											</li>
											<li>
												interne Stellen, soweit diese Daten im Rahmen
												ordnungsgemäßer Aufgabenerfüllung benötigt werden nach
												Art. 6 Abs1 a und f DSGVO
											</li>
											<li>
												öffentliche Stellen, sofern vorrangige
												Rechtsvorschriften dies erfordern nach Art. 6 Abs.1 c
												DSGVO
											</li>
											<li>
												externe Stellen zur ordnungsgemäßen Erfüllung von
												Verträgen Art.6 Abs.1 b DSGVO
											</li>
										</ul>
									</div>
								</li>
								<li>
									<h3 className="text-2xl font-bold mb-4">
										1.4 Auskunft, Berichtigung und Widerruf
									</h3>
									<p>
										Die Technologiestiftung Berlin ist eine rechtsfähige
										gemeinnützige Stiftung bürgerlichen Rechts. Im Rahmen der
										Tätigkeiten der Stiftung ist es notwendig, personenbezogene
										Daten zu handhaben. Personenbezogene Daten werden für die
										folgenden Zwecke erhoben, verarbeitet und genutzt: Dabei
										kann es dazu kommen, dass die Daten im Rahmen der
										gesetzlichen Vorgaben an Dritte zur Verarbeitung
										weitergegeben werden, da ein berechtigtes Interesse oder
										eine Verpflichtung besteht. Dies können folgende Dritte
										sein:
									</p>
								</li>
							</ol>
						</li>
						<li>
							<h2 className="text-2xl font-bold mb-4">2. Relevante Dienste</h2>
							<ol className="flex flex-col gap-8">
								<li>
									<h3 className="text-2xl font-bold mb-4">2.1 Websites</h3>
									<div className="flex flex-col gap-4">
										<div>
											Die Technologiestiftung Berlin bietet im Rahmen ihrer
											Arbeit folgende Websites an:
										</div>
										<ul className="flex flex-col ml-8 list-disc">
											<li>
												{styledLink(
													"https://www.technologiestiftung-berlin.de",
													"www.technologiestiftung-berlin.de",
												)}
											</li>
											<li>
												{styledLink(
													"https://www.berlin-innovation.de",
													"www.berlin-innovation.de",
												)}
											</li>
											<li>
												{styledLink(
													"https://www.codingklassenfahrt.de",
													"www.codingklassenfahrt.de",
												)}
											</li>
											<li>
												{styledLink(
													"https://www.odis-berlin.de",
													"www.odis-berlin.de",
												)}
											</li>
											<li>
												{styledLink(
													"https://www.kita-suche.de",
													"www.kita-suche.de",
												)}
											</li>
											<li>
												{styledLink(
													"https://www.breitband-berlin.de",
													"www.breitband-berlin.de",
												)}
											</li>
											<li>
												{styledLink(
													"https://www.badegewaesser-berlin.de",
													"www.badegewaesser-berlin.de",
												)}
											</li>
											<li>
												{styledLink(
													"https://www.kultur-b-digital.de",
													"www.kultur-b-digital.de",
												)}
											</li>
										</ul>
										<div>
											Generell gelten für diese Domains und deren Subdomains die
											gleichen Datenschutzbestimmungen. Besonderheiten finden
											Sie unter Punkt 3. Vor allem weist die Domain
											www.breitband-berlin.de Besonderheiten auf, da sie den
											Kartendienst Google Maps einbindet. Weitere Informationen
											dazu finden Sie unter 3.3.
										</div>
										<div>
											Die Internetpräsenz der Stiftung ist grundsätzlich ohne
											jede Angabe Ihrer personenbezogenen Daten frei nutzbar.
											Allerdings werden Daten während der Nutzung erhoben.
										</div>
										<div>
											Sobald Sie die Domain{" "}
											{styledLink(
												"https://www.technologiestiftung-berlin.de",
												"www.technologiestiftung-berlin.de",
											)}
											oder eine der oben genannten Seiten mit Ihrem Gerät
											aufrufen, werden automatisch durch den benutzten Browser
											eine Reihe von Daten übermittelt und temporär in einem
											Logfile gespeichert.
										</div>
										<ul className="flex flex-col ml-8 list-disc">
											<li>IP-Adresse</li>
											<li>Datum und Uhrzeit des Zugriffs</li>
											<li>Name und URL der abgerufenen Seite oder Datei</li>
											<li>Website, von der Sie uns erreicht haben</li>
											<li>Browser</li>
										</ul>
										<div>Die so erhobenen Daten dienen dazu,</div>
										<ul className="flex flex-col ml-8 list-disc">
											<li>
												einen reibungsfreien Verbindungsaufbau der Seite zu
												gewährleisten
											</li>
											<li>
												die Systemsicherheit und Stabilität der Seite zu
												verbessern
											</li>
											<li>
												administrative Zwecke zu erfüllen, wie z.B. die
												Verhinderung von Missbrauch
											</li>
										</ul>
									</div>
								</li>
								<li>
									<h3 className="text-2xl font-bold mb-4">2.2 Cookies</h3>
									<div className="flex flex-col gap-4">
										<div>
											Cookies sind Daten, die auf Ihrem Datenträger beim Besuch
											von Websites gespeichert werden und im Austausch mit
											unserer Website bestimmte Daten und Einstellungen
											speichern.
										</div>
										<div>
											Sie haben die Möglichkeit, dem Setzen von Cookies über die
											jeweiligen Browser-Einstellungen oder mit Hilfe anderer
											Erweiterungen wie Ghostery oder uBlock generell zu
											widersprechen bzw. diese einzuschränken. Welche
											Erweiterungen Sie mit Ihrem Internetbrowser nutzen können,
											finden Sie auf den jeweiligen Hersteller*innenseiten.
										</div>
										<div>
											Sie können bei der erstmaligen Nutzung unserer
											Online-Dienste eine Entscheidung treffen, ob Sie der
											Technologiestiftung Berlin erlauben, Cookies zur
											Verbesserung des Online-Angebots zu setzen oder nicht.
										</div>
										<div>
											Wir nutzen Cookies ausschließlich für die statistische
											Auswertung unserer Webauftritte und erheben nur
											pseudonymisierte Daten.
										</div>
									</div>
								</li>
								<li>
									<h3 className="text-2xl font-bold mb-4">
										2.3 Einbindung von Diensten und Inhalten Dritter
									</h3>
									<div className="flex flex-col gap-4">
										<div>
											Die Icons zu Facebook und Twitter auf unserer Hauptseite
											sind Verlinkungen zu unseren Kanälen auf den jeweiligen
											Plattformen. Welche Daten dabei übermittelt werden, ist
											von Ihren Browsereinstellungen abhängig. Eine weitere
											Datenübermittlung von uns an die beiden Drittanbieter
											findet nicht statt. Sobald Sie unsere Seite über diese
											Links verlassen, treten die dortigen
											Datenschutzbestimmungen in Kraft.
										</div>
										<div>
											Zum aktuellen Zeitpunkt (Stand 23. Mai 2018) setzen wir
											folgende Plugins für bestimmte Zwecke ein:
										</div>
										<ul className="flex flex-col ml-8 list-disc">
											<li>
												Kontaktformular Power Mail für die Bestellung der
												Hacking Box und beim Projekt Digitale Entwicklung des
												Kulturbereichs
											</li>
											<li>
												Open-Street-Map-Karte zur Information über die Anfahrt
												sowie zur geografischen Verortung von Projekten
											</li>
											<li>
												Juicer für einen Social-Media-Feed auf
												www.codingklassenfahrt.de (siehe 3.2)
											</li>
											<li>
												YouTube-Video-Einbindung auf www.codingklassenfahrt.de
												(siehe 3.2) und www.kultur-b-digtal.de (siehe 3.4)
											</li>
										</ul>
										<div>
											Durch Nutzung des Power-Mail-Formulars, das eine Extention
											unseres Content Managementsystems typo3 darstellt und von
											uns für die Bestellung der Hacking Box angeboten wird,
											geben Sie uns die Einwilligung nach Art.6 Abs. 1 Lit.A
											DSGVO, Ihre Daten für den Zweck der Ausleihe zu
											verarbeiten. Die Daten werden ausschließlich auf unserem
											Server verarbeitet und von uns genutzt. Nach Ende des
											Verleihvorgangs werden die Daten gelöscht.
										</div>
										<div>
											Um Ihnen die Anfahrt zu unseren Geschäftsräumen zu
											erleichtern und um Ihnen an anderen Stellen eine Ortung
											unserer Projekte zu bieten, haben wir
											Open-Street-Map-Karten in unseren Auftritt eingebunden.
											Hierfür nutzen wir das Application Programming Interface
											Open Layers. Die Verbindung läuft direkt über unserer
											Content Managementsystem und übermittelt keine
											persönlichen Daten an Dritte.
										</div>
									</div>
								</li>
							</ol>
						</li>
					</ol>
				</div>
			</Suspense>
		</Layout>
	);
}
