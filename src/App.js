import "./index.css";
import "./queries.css";
import ticketsData from "./data/tickets.json";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function App() {
	const [tickets, setTickets] = useState(ticketsData);
	const [pendingTickets, setPendingTickets] = useState([]);
	const [resolvedTickets, setResolvedTickets] = useState([]);

	function handlePendingTicket(newPendingTicket) {
		const isTicketExist = pendingTickets.find(
			(ticket) => ticket.id === newPendingTicket.id,
		);

		if (!isTicketExist) {
			toast.success(`[In-Progress] '${newPendingTicket.title}'`);

			setPendingTickets((prevTickets) => [...prevTickets, newPendingTicket]);

			setTickets((prevTickets) =>
				prevTickets.map((ticket) =>
					ticket.id === newPendingTicket.id
						? { ...ticket, status: "In-Progress" }
						: ticket,
				),
			);
		} else {
			toast.warn(`Ticket is already In-Progress`);
		}

		// onPendingTicket((prevTickets) => {
		// 	const isTicketExist = Boolean(
		// 		prevTickets.find((ticket) => ticket.id === newPendingTicket.id),
		// 	);

		// 	console.log(newPendingTicket);

		// 	if (!isTicketExist) {
		// 		toast.success(`'${newPendingTicket.title}' is ${newPendingTicket.status}`, {
		// 			toastId: "duplicate-ticket",
		// 		});
		// 		return [...prevTickets, newPendingTicket];
		// 	} else {
		// 		toast.warn("Ticket already exists", { toastId: "duplicate-ticket" });
		// 		return prevTickets;
		// 	}
		// });
	}

	function handleResolveTicket(newResolvedTicket) {
		setPendingTickets((prevTickets) =>
			prevTickets.filter((ticket) => ticket.id !== newResolvedTicket.id),
		);

		setResolvedTickets((prevTickets) => [...prevTickets, newResolvedTicket]);

		setTickets((prevTickets) =>
			prevTickets.filter((ticket) => ticket.id !== newResolvedTicket.id),
		);

		toast.success(`[Resolved] '${newResolvedTicket.title}'`);
	}

	return (
		<div className="app">
			<ToastContainer />
			<Header />
			<Hero
				pendingTicketsCount={pendingTickets.length}
				resolvedTicketsCount={resolvedTickets.length}
			/>
			<MainSection
				tickets={tickets}
				pendingTickets={pendingTickets}
				onPendingTicket={handlePendingTicket}
				resolvedTickets={resolvedTickets}
				onResolveTicket={handleResolveTicket}
			/>
			<Footer />
		</div>
	);
}

function Header() {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	function handleMenu() {
		setIsOpenMenu((open) => !open);
	}

	return (
		<header className={`header${isOpenMenu ? ` nav-open` : ``}`}>
			<a href="#" className="logo">
				CS - Ticket System
			</a>

			<nav className="main-nav">
				<ul className="main-nav-list">
					<li>
						<a className="main-nav-link" href="#">
							Home
						</a>
					</li>
					<li>
						<a className="main-nav-link" href="#">
							FAQ
						</a>
					</li>
					<li>
						<a className="main-nav-link" href="#">
							Changelog
						</a>
					</li>
					<li>
						<a className="main-nav-link" href="#">
							Blog
						</a>
					</li>
					<li>
						<a className="main-nav-link" href="#">
							Download
						</a>
					</li>
					<li>
						<a className="main-nav-link" href="#">
							Contact
						</a>
					</li>
					<li>
						<button className="main-nav-link nav-cta flex gap-sm">
							<span>+</span>
							<span>New Ticket</span>
						</button>
					</li>
				</ul>
			</nav>

			<button className="btn-mobile-nav" onClick={handleMenu}>
				<svg
					className="icon-mobile-nav"
					name="menu-outline"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					viewBox="0 0 256 256"
				>
					<path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path>
				</svg>
				<svg
					className="icon-mobile-nav"
					name="close-outline"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					viewBox="0 0 256 256"
				>
					<path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
				</svg>
			</button>
		</header>
	);
}

function Hero({ pendingTicketsCount, resolvedTicketsCount }) {
	return (
		<section className="section-hero">
			<div className="hero">
				<div className="container-progress">
					<div className="status-text-box">
						<h1 className="status-title">In-Progress</h1>
						<p className="status-count">{pendingTicketsCount}</p>
					</div>
					<div className="hero-images-container">
						<div className="hero-img-box">
							<img
								className="hero-img"
								src="./vector1.png"
								alt="hero image left"
							/>
						</div>
						<div className="hero-img-box">
							<img
								className="hero-right-img hero-img"
								src="./vector1.png"
								alt="hero image right"
							/>
						</div>
					</div>
				</div>
				<div className="container-resolved">
					<div className="status-text-box">
						<h1 className="status-title">Resolved</h1>
						<p className="status-count">{resolvedTicketsCount}</p>
					</div>
					<div className="hero-images-container">
						<div className="hero-img-box">
							<img
								className="hero-img"
								src="./vector1.png"
								alt="hero image left"
							/>
						</div>
						<div className="hero-img-box">
							<img
								className="hero-right-img hero-img"
								src="./vector1.png"
								alt="hero image right"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function MainSection({
	tickets,
	pendingTickets,
	onPendingTicket,
	resolvedTickets,
	onResolveTicket,
}) {
	return (
		<section className="section-main">
			<div className="container grid grid--7-3 gap-lg main-grid">
				<TicketSection tickets={tickets} onPendingTicket={onPendingTicket} />
				<TaskSection
					pendingTickets={pendingTickets}
					resolvedTickets={resolvedTickets}
					onResolveTicket={onResolveTicket}
				/>
			</div>
		</section>
	);
}

function TicketSection({ tickets, onPendingTicket }) {
	return (
		<div className="section-ticket">
			<h2 className="secondary-heading mb-rg">Customer Tickets</h2>
			<div className="grid grid--1-1 gap-rg tickets-grid">
				{tickets.map((ticket) => (
					<Ticket ticket={ticket} onPendingTicket={onPendingTicket} />
				))}
			</div>
		</div>
	);
}

function Ticket({ ticket, onPendingTicket }) {
	const priorityColors = {
		High: "red",
		Medium: "yellow",
		Low: "green",
	};

	return (
		<div
			className="card flex flex--dir-col justify-between gap-sm"
			onClick={() => onPendingTicket(ticket)}
		>
			<div className="flex gap-rg justify-between align-start mb-sm">
				<h3 className="tertiary-heading">{ticket.title}</h3>
				<span
					className={`card-status flex align-center gap-xs bg-${ticket.status === "In-Progress" ? "yellow" : "green"}`}
				>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<circle cx="12" cy="12" r="12" />
						</svg>
					</span>
					<span>{ticket.status}</span>
				</span>
			</div>
			<p className="mb-sm">{ticket.description}</p>
			<div className="card-meta flex justify-between align-center">
				<div className="card-meta-group flex align-center gap-sm">
					<span className="card-id">{ticket.id}</span>
					<span
						className={`card-priority ${priorityColors[ticket.priority]}`}
					>{`${ticket.priority} priority`}</span>
				</div>
				<div className="card-meta-group flex align-center gap-md">
					<span className="card-username">{ticket.assignee}</span>
					<div className="flex align-center gap-sm">
						<div>
							<span className="calender-icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="size-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
									/>
								</svg>
							</span>
						</div>
						<span>{ticket.createdAt}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

function TaskSection({ pendingTickets, resolvedTickets, onResolveTicket }) {
	return (
		<div className="flex flex--dir-col gap-xlg">
			<TaskStatus
				pendingTickets={pendingTickets}
				onResolveTicket={onResolveTicket}
			/>
			<ResolvedTask resolvedTickets={resolvedTickets} />
		</div>
	);
}

function TaskStatus({ pendingTickets, onResolveTicket }) {
	return (
		<div>
			<h2 className="secondary-heading mb-rg">Task Status</h2>
			{pendingTickets.length === 0 ? (
				<p>Select a ticket to add to Task Status</p>
			) : (
				<div className="flex flex--dir-col gap-rg">
					{pendingTickets
						.slice()
						.reverse()
						.map((ticket) => (
							<div className="flex flex--dir-col gap-rg card">
								<h3 className="tertiary-heading">{ticket.title}</h3>
								<button
									className="btn-complete"
									onClick={() => onResolveTicket(ticket)}
								>
									Complete
								</button>
							</div>
						))}
				</div>
			)}
		</div>
	);
}

function ResolvedTask({ resolvedTickets }) {
	return (
		<div>
			<h2 className="secondary-heading mb-rg">Resolved Task</h2>
			{resolvedTickets.length === 0 ? (
				<p>No resolved tasks yet.</p>
			) : (
				<div className="flex flex--dir-col gap-rg">
					{resolvedTickets
						.slice()
						.reverse()
						.map((ticket) => (
							<div className="bg-blue resolved">
								<h3 className="tertiary-heading">{ticket.title}</h3>
							</div>
						))}
				</div>
			)}
		</div>
	);
}

function Footer() {
	return (
		<footer className="section-footer">
			<div className="container">
				<div className="grid grid--2-4 gap-lg footer-grid-main">
					<div className="flex flex--dir-col gap-rg">
						<h4 className="logo">CS - Ticket System</h4>
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book.
						</p>
					</div>

					<div className="grid grid--4-cols gap-lg footer-grid-list">
						<div>
							<h4 className="quaternary-heading mb-sm">Company</h4>
							<ul className="flex flex--dir-col gap-rg">
								<li>
									<a className="footer-link" href="#">
										About Us
									</a>
								</li>
								<li>
									<a className="footer-link" href="#">
										Our Mission
									</a>
								</li>
								<li>
									<a className="footer-link" href="#">
										Contact Sales
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="quaternary-heading mb-sm">Services</h4>
							<ul className="flex flex--dir-col gap-rg">
								<li>
									<a className="footer-link" href="#">
										Products & Services
									</a>
								</li>
								<li>
									<a className="footer-link" href="#">
										Customer Stories
									</a>
								</li>
								<li>
									<a className="footer-link" href="#">
										Download Apps
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="quaternary-heading mb-sm">Information</h4>
							<ul className="flex flex--dir-col gap-rg">
								<li>
									<a className="footer-link" href="#">
										Privacy Policy
									</a>
								</li>
								<li>
									<a className="footer-link" href="#">
										Terms & Conditions
									</a>
								</li>
								<li>
									<a className="footer-link" href="#">
										Join Us
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="quaternary-heading mb-sm">Social Links</h4>
							<ul className="flex flex--dir-col gap-rg">
								<li>
									<a className="footer-link flex align-center gap-sm" href="#">
										<span className="footer-icon">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="#000000"
												viewBox="0 0 256 256"
											>
												<path d="M218.12,209.56l-61-95.8,59.72-65.69a12,12,0,0,0-17.76-16.14L143.81,92.77,106.12,33.56A12,12,0,0,0,96,28H48A12,12,0,0,0,37.88,46.44l61,95.8L39.12,207.93a12,12,0,1,0,17.76,16.14l55.31-60.84,37.69,59.21A12,12,0,0,0,160,228h48a12,12,0,0,0,10.12-18.44ZM166.59,204,69.86,52H89.41l96.73,152Z"></path>
											</svg>
										</span>
										<span>@CS — Ticket System</span>
									</a>
								</li>
								<li>
									<a className="footer-link flex align-center gap-sm" href="#">
										<span className="footer-icon">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="#000000"
												viewBox="0 0 256 256"
											>
												<path d="M216,20H40A20,20,0,0,0,20,40V216a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V40A20,20,0,0,0,216,20Zm-4,192H44V44H212ZM112,176V120a12,12,0,0,1,21.43-7.41A40,40,0,0,1,192,148v28a12,12,0,0,1-24,0V148a16,16,0,0,0-32,0v28a12,12,0,0,1-24,0ZM96,120v56a12,12,0,0,1-24,0V120a12,12,0,0,1,24,0ZM68,80A16,16,0,1,1,84,96,16,16,0,0,1,68,80Z"></path>
											</svg>
										</span>
										<span>@CS — Ticket System</span>
									</a>
								</li>
								<li>
									<a className="footer-link flex align-center gap-sm" href="#">
										<span className="footer-icon">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="#000000"
												viewBox="0 0 256 256"
											>
												<path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm12,191.13V156h20a12,12,0,0,0,0-24H140V112a12,12,0,0,1,12-12h16a12,12,0,0,0,0-24H152a36,36,0,0,0-36,36v20H96a12,12,0,0,0,0,24h20v55.13a84,84,0,1,1,24,0Z"></path>
											</svg>
										</span>
										<span>@CS — Ticket System</span>
									</a>
								</li>
								<li>
									<a className="footer-link flex align-center gap-sm" href="#">
										<span className="footer-icon">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="#000000"
												viewBox="0 0 256 256"
											>
												<path d="M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44ZM193.15,68,128,127.72,62.85,68ZM44,188V83.28l75.89,69.57a12,12,0,0,0,16.22,0L212,83.28V188Z"></path>
											</svg>
										</span>
										<span>support@cst.com</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="copyright container">
				<p>© 2025 CS — Ticket System. All rights reserved.</p>
			</div>
		</footer>
	);
}
