"use client";

import * as React from "react";

import { Document, Page, pdfjs } from "react-pdf";

import { cn } from "@ziron/ui/lib/utils";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type ViewMode = "single" | "scroll" | "book";

interface PdfViewerProps {
	/** URL to the PDF file or File object */
	file: string | File;
	/** Initial viewing mode */
	mode?: ViewMode;
	/** Initial zoom level (0.5 to 2.0) */
	initialZoom?: number;
	/** Custom className */
	className?: string;
}

// https://www.tryelements.dev/docs/pdf/pdf-viewer

export function PdfViewer({ file, mode = "single", initialZoom = 1.0, className }: PdfViewerProps) {
	const [numPages, setNumPages] = React.useState<number>(0);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [viewMode, setViewMode] = React.useState<ViewMode>(mode);
	const [zoom, setZoom] = React.useState<number>(initialZoom);
	const [pageWidth, setPageWidth] = React.useState<number>(0);
	const containerRef = React.useRef<HTMLDivElement>(null);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
		setCurrentPage(1);
	}

	// Calculate page width based on container and zoom
	React.useEffect(() => {
		if (!containerRef.current) return;

		const updateWidth = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.clientWidth;
				const baseWidth = viewMode === "book" ? containerWidth / 2 - 40 : containerWidth - 40;
				setPageWidth(baseWidth * zoom);
			}
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, [viewMode, zoom]);

	const goToPreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - (viewMode === "book" ? 2 : 1), 1));
	};

	const goToNextPage = () => {
		setCurrentPage((prev) =>
			Math.min(prev + (viewMode === "book" ? 2 : 1), viewMode === "book" ? numPages - 1 : numPages)
		);
	};

	const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.0));
	const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
	const handleFitWidth = () => setZoom(1.0);

	const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const page = Number.parseInt(e.target.value, 10);
		if (!Number.isNaN(page) && page >= 1 && page <= numPages) {
			setCurrentPage(page);
		}
	};

	return (
		<div
			className={cn("flex flex-col overflow-hidden rounded-lg border bg-background", className)}
			data-slot="pdf-viewer"
		>
			{/* Toolbar */}
			<div className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b bg-muted/50 p-3">
				{/* Mode Switcher */}
				<div className="flex items-center gap-1 rounded-md border bg-background p-1">
					<button
						className={cn(
							"rounded px-3 py-1.5 font-medium text-xs transition-colors",
							viewMode === "single"
								? "bg-primary text-primary-foreground"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						)}
						onClick={() => setViewMode("single")}
						type="button"
					>
						Single
					</button>
					<button
						className={cn(
							"rounded px-3 py-1.5 font-medium text-xs transition-colors",
							viewMode === "scroll"
								? "bg-primary text-primary-foreground"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						)}
						onClick={() => setViewMode("scroll")}
						type="button"
					>
						Scroll
					</button>
				</div>

				{/* Page Navigation */}
				{viewMode !== "scroll" && (
					<div className="flex items-center gap-2">
						<button
							className="rounded border bg-background px-2 py-1 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
							disabled={currentPage <= 1}
							onClick={goToPreviousPage}
							type="button"
						>
							←
						</button>
						<div className="flex items-center gap-1 text-sm">
							<input
								className="w-12 rounded border bg-background px-2 py-1 text-center"
								max={numPages}
								min={1}
								onChange={handlePageInput}
								type="number"
								value={currentPage}
							/>
							<span className="text-muted-foreground">/ {numPages}</span>
						</div>
						<button
							className="rounded border bg-background px-2 py-1 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
							disabled={currentPage >= numPages}
							onClick={goToNextPage}
							type="button"
						>
							→
						</button>
					</div>
				)}

				{/* Zoom Controls */}
				<div className="flex items-center gap-2">
					<button
						className="rounded border bg-background px-2 py-1 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
						disabled={zoom <= 0.5}
						onClick={handleZoomOut}
						type="button"
					>
						−
					</button>
					<span className="min-w-12 text-center text-muted-foreground text-sm">
						{Math.round(zoom * 100)}%
					</span>
					<button
						className="rounded border bg-background px-2 py-1 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
						disabled={zoom >= 2.0}
						onClick={handleZoomIn}
						type="button"
					>
						+
					</button>
					<button
						className="rounded border bg-background px-2 py-1 text-xs hover:bg-muted"
						onClick={handleFitWidth}
						type="button"
					>
						Fit
					</button>
				</div>
			</div>

			{/* PDF Document */}
			<div
				className={cn(
					"flex-1 overflow-auto bg-muted/30",
					viewMode === "scroll" && "p-4",
					viewMode !== "scroll" && "flex items-start justify-center p-4"
				)}
				ref={containerRef}
			>
				<Document
					className={cn(viewMode === "scroll" && "space-y-4", viewMode === "book" && "flex gap-4")}
					error={
						<div className="flex items-center justify-center p-8">
							<div className="text-destructive text-sm">
								Failed to load PDF. Please check the file or URL.
							</div>
						</div>
					}
					file={file}
					loading={
						<div className="flex items-center justify-center p-8">
							<div className="text-muted-foreground text-sm">Loading PDF...</div>
						</div>
					}
					onLoadSuccess={onDocumentLoadSuccess}
				>
					{viewMode === "scroll" && (
						<>
							{Array.from(new Array(numPages), (_, index) => (
								<div className="flex justify-center" key={`page_${index + 1}`}>
									<Page
										className="shadow-lg"
										loading={
											<div className="h-[800px] w-full animate-pulse rounded bg-background" />
										}
										pageNumber={index + 1}
										width={pageWidth}
									/>
								</div>
							))}
						</>
					)}

					{viewMode === "single" && (
						<div className="flex justify-center">
							<Page
								className="shadow-lg"
								loading={<div className="h-[800px] w-full animate-pulse rounded bg-background" />}
								pageNumber={currentPage}
								width={pageWidth}
							/>
						</div>
					)}
				</Document>
			</div>
		</div>
	);
}

export type { PdfViewerProps, ViewMode };
