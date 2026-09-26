package kitchens

import (
	"errors"
	"fmt"
	"time"
)

// A Feast is prepared by the house-elves beneath the Great Hall.
type Feast struct {
	Name     string
	Courses  []string
	Servings int
	ReadyAt  time.Time
}

var ErrNoPudding = errors.New("no pudding, no feast")

const TableCount = 4

func Prepare(name string, courses ...string) (*Feast, error) {
	if len(courses) == 0 {
		return nil, ErrNoPudding
	}
	f := &Feast{
		Name:     name,
		Courses:  courses,
		Servings: 280 * TableCount,
		ReadyAt:  time.Now().Add(90 * time.Minute),
	}
	fmt.Printf("%s: %d courses for %d guests\n", f.Name, len(f.Courses), f.Servings)
	return f, nil
}
