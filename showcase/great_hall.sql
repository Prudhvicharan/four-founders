-- House points at the end of term
SELECT h.name AS house,
       SUM(p.points) AS total,
       COUNT(DISTINCT p.student_id) AS contributors
FROM points p
JOIN houses h ON h.id = p.house_id
WHERE p.awarded_at >= '2026-09-01'
  AND p.reason NOT LIKE '%late night%'
GROUP BY h.name
HAVING SUM(p.points) > 0
ORDER BY total DESC
LIMIT 4;
