"use client"

import { useEffect, useState, useMemo } from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Pagination } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import useCountry from "@/hooks/useCountry"

export default function CountryTable() {
  const {
    data,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    prevPage,
    nextPage
  } = useCountry(16);

  return (
    <Card className="p-6 overflow-hidden">
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar país por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={() => setSearch("")}>Limpiar</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead key="name" className="min-w-[150px] text-black-500 font-bold">Name</TableHead>
            <TableHead key="capital" className="min-w-[120px] text-black-500 font-bold">Capital</TableHead>
            <TableHead key="region" className="min-w-[120px] text-black-500 font-bold">Region</TableHead>
            <TableHead key="population" className="min-w-[120px] text-right text-black-500 font-bold">Population</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No se encontraron países.
              </TableCell>
            </TableRow>
          ) : (
            data.map((country) => (
              <TableRow key={country.name}>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.capital}</TableCell>
                <TableCell>{country.region}</TableCell>
                <TableCell className="text-right">
                  {country.population.toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Button onClick={prevPage} disabled={page === 1}>
          Anterior
        </Button>

        <Pagination page={page} total={totalPages} onChange={setPage} />

        <Button onClick={nextPage} disabled={page === totalPages}>
          Siguiente
        </Button>
      </div>
    </Card>
  )
}
