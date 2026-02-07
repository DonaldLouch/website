SELECT
  DISTINCT location AS locations
FROM
  (
    SELECT
      "Photography".location
    FROM
      "Photography"
  ) locations
WHERE
  (location IS NOT NULL);