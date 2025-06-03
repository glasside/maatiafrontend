import { useEffect, useMemo, useState } from "react";

function useCountry(rowsPerPage) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/getCountries")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, data]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return {
    data: paginatedData,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    prevPage: () => setPage(p => Math.max(p - 1, 1)),
    nextPage: () => setPage(p => Math.min(p + 1, totalPages)),
  };
}

export default useCountry