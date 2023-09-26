import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Input } from "./Input";
import { Modal } from "./Modal";
import { Select } from "./Select";
import { BookStore } from "../stores/bookStore";
import Pagination from "./Pagination/Pagination";

const dummyData = [
	{ id: 1, name: "Refactoring", author: 'Martin Fowler', topic: "Programming" }, 
	{ id: 2, name: "Designing Data-Intensive Applications", author: 'Martin Kleppmann', topic: "Database" }, 
	{ id: 3, name: "The Phoenix Project", author: 'Gene Kim', topic: "DevOps" }, 
	{ id: 4, name: "Refactoring 2", author: 'Martin Fowler', topic: "Programming" }, 
	{ id: 5, name: "Data-Intensive Applications", author: 'Martin Kleppmann', topic: "Database" },
	{ id: 6, name: "Refactoring 3", author: 'Martin Fowler', topic: "Programming" }, 
	{ id: 7, name: "Designing Data-Intensive Applications 2", author: 'Martin Kleppmann', topic: "Database" }, 
	{ id: 8, name: "The Phoenix Project 2", author: 'Gene Kim', topic: "DevOps" }, 
	{ id: 9, name: "Refactoring 4", author: 'Martin Fowler', topic: "Programming" }, 
	{ id: 10, name: "Data-Intensive Applications 2", author: 'Martin Kleppmann', topic: "Database" },
	{ id: 11, name: "Refactoring 5", author: 'Martin Fowler', topic: "Programming" }, 
	{ id: 12, name: "Designing Data-Intensive Applications 3", author: 'Martin Kleppmann', topic: "Database" }, 
	{ id: 13, name: "The Phoenix Project 3", author: 'Gene Kim', topic: "DevOps" }, 
	{ id: 14, name: "Refactoring 6", author: 'Martin Fowler', topic: "Programming" }, 
	{ id: 15, name: "Data-Intensive Applications 3", author: 'Martin Kleppmann', topic: "Database" },
];

const topicItems = ['Programming', 'Database', 'DevOps'];
const PageSize = 5;

export const MainContent = () => {
	const { bookStore, setBookStore } = useContext(BookStore);
	const [booksData, setBooksData] = useState([]);
	const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
	const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] = useState(false);
	const deleteBookId = useRef('');
	const currentSearch = useRef('');

  const currentTableData = useMemo(() => {
    const firstPageIndex = (bookStore.currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
		return booksData.slice(firstPageIndex, lastPageIndex);
  }, [bookStore.currentPage, booksData]);

	if(!currentTableData.length && bookStore.currentPage > 1){
		setBookStore(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
	}

	const handleAddBook = (event) => { 
		event.preventDefault();
		let nameInputEle = document.getElementById("name");
		let authorInputEle = document.getElementById("author");
		let topicSelectEle = document.getElementById("topic");
		const newBook = { 
			id: parseInt(Math.random().toString(36).slice(2), 36), 
			name: nameInputEle.value, 
			author: authorInputEle.value, 
			topic: topicSelectEle.value
		};
		setBookStore(prev => ({ ...prev, booksData: [...prev.booksData, newBook]}));
		const searchInputEle = document.getElementById("search-input");
		searchInputEle.value = '';
		currentSearch.current = '';
		handleToggleAddBookModal();
	}

	const handleDeleteBook = () => {
		if (deleteBookId.current) {
			setBookStore(prev => ({ ...prev, booksData: [...prev.booksData.filter(item => item.id !== deleteBookId.current)] }));
		}
		handleToggleDeleteBookModal();
	}

	const handleSearch = (event) => { 
		currentSearch.current = event.target.value.toLowerCase();
		const searchedBooks = bookStore.booksData.filter(item => item.name.toLowerCase().includes(currentSearch.current));
		setBooksData(searchedBooks);
	}

	const handleToggleAddBookModal = () => {
		if (isAddBookModalOpen){
			document.getElementById("name").value = "";
			document.getElementById("author").value = "";
			document.getElementById("topic").value = topicItems[0];
		}
		setIsAddBookModalOpen(!isAddBookModalOpen);
	}

	const handleToggleDeleteBookModal = (selectedBookId) => {
		if (selectedBookId) {
			deleteBookId.current = selectedBookId;
		}
		setIsDeleteBookModalOpen(!isDeleteBookModalOpen);
	}

	const getDeleteBookName = () => { 
		if(!bookStore.booksData) return '';
		const selectedBook = bookStore.booksData.find(item => item.id === deleteBookId.current);
		return selectedBook?.name;
	}
	

	useEffect(() => {
		const savedBooks = localStorage.getItem("booksData");
		const savedBooksData = JSON.parse(savedBooks)
		if (savedBooksData?.length) {
			setBookStore(prev => ({...prev, booksData: savedBooksData}));
		} else {
			setBookStore(prev => ({...prev, booksData: dummyData}));
		}
	}, [])

	useEffect(() => {
		setBooksData(bookStore.booksData)
	}, [bookStore.booksData])
 
	useEffect(() => {
		const saveBooksData = () => {
			localStorage.setItem("booksData", JSON.stringify(bookStore.booksData));
	};
		window.addEventListener('beforeunload', saveBooksData);
		return () => {
			window.removeEventListener('beforeunload',saveBooksData);
		}
	}, [])

	return (
		<>
			<main className="main">
				<div>
					<section className="main__search">
						<Input id="search-input" placeholder="Search books" onChange={(event) => handleSearch(event)}/>
						<button className="button button--primary" type="button" onClick={handleToggleAddBookModal}>
							Add book
						</button>
					</section>
					<section className="main__table">
						<table>
							<thead>
									<tr>
											<th>Name</th>
											<th>Author</th>
											<th>Topic</th>
											<th>Action</th>
									</tr>
							</thead>
							<tbody>
									{currentTableData.length ? currentTableData.map(book => (
										<tr key={book.id}>
											<td>{book.name}</td>
											<td>{book.author}</td>
											<td>{book.topic}</td>
											<td>
												<button className='button-link' type='button' onClick={() => handleToggleDeleteBookModal(book.id)}>
													Delete
												</button>
											</td>
										</tr>
									)) : null}
							</tbody>
						</table>
					</section>
				</div>

				<Pagination
					className="pagination-bar"
					currentPage={bookStore.currentPage}
					totalCount={booksData.length}
					pageSize={PageSize}
					onPageChange={page => setBookStore(prev => ({ ...prev, currentPage: page}))}
				/>
			</main>

			<Modal isOpen={isAddBookModalOpen} onCLose={handleToggleAddBookModal} title="Add book">
				<form action=''>
					<p>Name</p>
					<Input id="name" />
					<p>Author</p>
					<Input id="author" />
					<Select label='Topic' labelClassName='topicsLabel' items={topicItems} id="topic"/>
					<div className="modal__content__body__actions">
						<button className="button button--primary" type="submit" onClick={(event) => handleAddBook(event)}>
							Create
						</button>
					</div>
				</form>
			</Modal>

			<Modal isOpen={isDeleteBookModalOpen} onCLose={handleToggleDeleteBookModal} title="Delete book">
        <div className="confirm-delete-text">
          <p>Do you want to delete </p> 
          <span><strong>{getDeleteBookName()}</strong> book?</span>
        </div>
				<div className="modal__content__body__actions">
          <button className="button button--secondary" type="button" onClick={() => handleDeleteBook(deleteBookId.current)}>
						Delete
					</button>
          <button className="button button--primary" type="button" onClick={handleToggleDeleteBookModal}>
						Cancel
					</button>
        </div>
			</Modal>
		</>
)}