import {useState, useEffect} from 'react';
import Pagination from 'react-bootstrap/Pagination';

const MoviePagination = ({currentPage, maxPage, onPageChange}) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        let itemList = []
        if (currentPage > 1 && currentPage < maxPage) {
            if (currentPage === 2) {
                for (let i = currentPage; i < currentPage + 3; i++) {
                    itemList.push(
                        <Pagination.Item key={i} active={currentPage === i} onClick={(e) => handlePageChange(e, i)}>{i}</Pagination.Item>
                    );
                }
            } else {
                for (let i = currentPage - 1; i < currentPage + 2; i++) {
                    if (i !== maxPage) {
                        itemList.push(
                            <Pagination.Item key={i} active={currentPage === i} onClick={(e) => handlePageChange(e, i)}>{i}</Pagination.Item>
                        );
                    }
                }
            }

        } else if (currentPage === 1) {
            for (let i = currentPage + 1; i < currentPage + 4; i++) {
                itemList.push(
                    <Pagination.Item key={i} active={currentPage === i} onClick={(e) => handlePageChange(e, i)}>{i}</Pagination.Item>
                );
            }
        } else if (currentPage === maxPage) {
            for (let i = currentPage - 2; i < currentPage; i++) {
                itemList.push(
                    <Pagination.Item key={i} active={currentPage === i} onClick={(e) => handlePageChange(e, i)}>{i}</Pagination.Item>
                )
            }
        }
        setItems(itemList);
    }, [currentPage, maxPage]);

    const handlePageChange = (e, page) => {
        e.preventDefault();
        onPageChange(page);
    }

    return(
        <div className="pagination-container">
            <Pagination>
                <Pagination.First disabled={currentPage === 1} onClick={(e) => handlePageChange(e, 1)}/>
                <Pagination.Prev disabled = {currentPage === 1} onClick={(e) => handlePageChange(e, currentPage - 1)}/>
                <Pagination.Item active={1 === currentPage} onClick={(e) => handlePageChange(e, 1)}>1</Pagination.Item>
                {currentPage > 3 ? <Pagination.Ellipsis/> : <></>}
                {items}
                {currentPage < (maxPage - 2) ? <Pagination.Ellipsis/> : <></>}
                <Pagination.Item active={currentPage === maxPage} onClick={(e) => handlePageChange(e, maxPage)}>{maxPage}</Pagination.Item>
                <Pagination.Next disabled={currentPage === maxPage} onClick={(e) => handlePageChange(e, currentPage + 1)}/>
                <Pagination.Last onClick={(e) => handlePageChange(e, maxPage)}/>
            </Pagination>
        </div>
    )
}

export default MoviePagination;