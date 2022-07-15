const Pagination = ({ charactersPerPage, characterList, page, setPage }) => {
  let pageNumbers = [];

  //Calculo de la cantidad total de paginas
  for (
    let i = 0;
    i < Math.ceil(characterList.length / charactersPerPage);
    i++
  ) {
    pageNumbers.push(i + 1);
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (page !== pageNumbers.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleStart = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleEnd = (e) => {
    e.preventDefault();
    if (page !== pageNumbers.length) {
      setPage(pageNumbers.length);
    }
  };

  return (
    <div>
      <buttton
        onClick={handleStart}
        style={{ border: "solid 1px black", margin: "10px" }}
      >
        Start
      </buttton>
      <buttton
        onClick={handlePrev}
        style={{ border: "solid 1px black", margin: "10px" }}
      >
        Prev
      </buttton>
      <label>
        {page} of {pageNumbers.length}
      </label>
      <buttton
        onClick={handleNext}
        style={{ border: "solid 1px black", margin: "10px" }}
      >
        Next
      </buttton>
      <buttton
        onClick={handleEnd}
        style={{ border: "solid 1px black", margin: "10px" }}
      >
        End
      </buttton>
    </div>
  );
};

export default Pagination;
