export const enum FILTER {
	NONE,
	EQUAL_TO,
	BEGINS_WITH
}

export const enum SORT {
	NONE,
	KEY,
	VALUE,
	SEARCH_KEY,
	FOREIGN_KEY
}

export const enum DRAG_STATE {
	START,
	OVER,
	DROP
}

export const enum TRIGGER {
	TRANSACTION_TYPE,
	ACCOUNT
}

export const enum ANIMATION_STATE {
	ITEM_ADDED,
	ITEM_REMOVED
}

export const enum STATUS {
	SUCCESS = 0,
	FAILURE = -1
}

export const enum ERROR {
	KEY_IS_EMPTY = 105,
	KEY_NOT_VALID = 106,
	KEY_NOT_FOUND = 101,
	INSERT_FAILED = 102,
	DELETE_FAILED = 103,
	UPDATE_FAILED = 104
}

export const enum DATABASE_OPERATION {
	NONE,
	INSERT,
	DELETE,
	UPDATE,
	SELECT
}

export const enum EVENT {
	NONE,
	LOG_IN,
	LOG_OUT
}