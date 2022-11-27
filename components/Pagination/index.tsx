import { PaginationMenu } from "./PaginationMenu";

export default function Pagination(pagination: any) {
// export const Pagination = () => {
  const paginationArray = pagination;
  const currentPage = paginationArray?.[1] + 1;

  const previousPages = new Array() as any;
  const nextPages = new Array() as any;

  for (let index = currentPage + 1; index < paginationArray?.[0] + 1; index++) {
    nextPages.push(index);
  }

  for (let indexPrev = currentPage - 1; indexPrev >= 1; indexPrev--) {
    previousPages.push(indexPrev);
  }

  // console.log(previousPages);

  const pages = new Array() as any;
  if (paginationArray?.[0] <= 5) {
    if (paginationArray?.[0] == 1) {
      pages.push(1);
    }
    if (paginationArray?.[0] == 2) {
      pages.push(1, 2);
    }
    if (paginationArray?.[0] == 3) {
      pages.push(1, 2, 3);
    }
    if (paginationArray?.[0] == 4) {
      pages.push(1, 2, 3, 4);
    }
    if (paginationArray?.[0] == 5) {
      pages.push(1, 2, 3, 4, 5);
    }
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...Nex", paginationArray?.[0]);
    } else if (paginationArray?.[0] - 3 <= currentPage) {
      pages.push(
        1,
        "...Prev",
        paginationArray?.[0] - 4,
        paginationArray?.[0] - 3,
        paginationArray?.[0] - 2,
        paginationArray?.[0] - 1,
        paginationArray?.[0]
      );
    } else {
      pages.push(
        1,
        "...Prev",
        currentPage - 3,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        currentPage + 3,
        "...Nex",
        paginationArray?.[0]
      );
    }
  }
  // console.log(paginationArray)
  
  return (
    <>
      {paginationArray?.[0] > 1 ? (
        <PaginationMenu
          pages={pages}
          currentPage={currentPage}
          nextPages={nextPages}
          previousPages={previousPages}
        />
      ) : null}
    </>
  )
}
