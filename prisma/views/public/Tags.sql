SELECT
  DISTINCT tag AS tags
FROM
  (
    SELECT
      unnest("BlogPost".tags) AS tag
    FROM
      "BlogPost"
    UNION
    ALL
    SELECT
      unnest("Photography".tags) AS tag
    FROM
      "Photography"
    UNION
    ALL
    SELECT
      unnest("Videography".tags) AS tag
    FROM
      "Videography"
  ) tags
WHERE
  (tag IS NOT NULL);