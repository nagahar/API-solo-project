# Schema Design

`pk` = Primary Key
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## Task Table

```
TABLE task {
	id int [pk]
	poeple_id id [ref: > people.id, not null]
	title varchar(32) NOT NULL
	description varchar(64)
	end_date date
	notify_date date
}
```

## People Table

```
TABLE people {
	id int [pk]
	last_name varchar(64) NOT NULL
	first_name varchar(64) NOT NULL
	email varchar(64) NOT NULL
}

```
