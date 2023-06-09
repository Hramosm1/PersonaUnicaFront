export interface Page {
	// The number of elements in the page
	take: number;
	// The total number of elements
	totalElements: number;
	// The total number of pages
	totalPages: number;
	// The current page number
	pageNumber: number;
}
