---
title: "Data migration and flow migration strategy"
date: "2025-10-13"
category: "blog"
star: 5
keyword: "backend"
---

It's a tricky and common task, to implement the same feature in a new way. For example, before we read data from DB A via method A, with the migration, we want to read data from DB B via method B and they should behave the same way. Or, another example, before we write data into DB A, and with the migration, we will write data into DB B, DB B needs to contain full data of DB A.

There are common strategies to handle this technical challenges.

## READ from two data source

Imageine the scenario that api read data from DB A with method A, and in the future, the api read data from DB B with method B.

![](images/migration/1.png)

The challenge is: how to make sure data reading from DB A and DB B has no discrepency and make sure data integrity ?

In order to do so, before serving the data to the front-end, the api could make an internal data comparasion and log the data disprency, but still serve the data of the old data source with the old way (method A with DB A).

![](images/migration/2.png)

When there is no more data discrepancies, we can decomission the reading from DB A with method A.

![](images/migration/3.png)

## WRITE into two data source

Migration with data writing is more triky, because it concerns data migration.

![](images/migration/4.png)

Imagine the following case: the api calls service A and service B in the same time and save data into two DB separately, but the challenge is the new DB (DB B) doesn't contain legacy data from DB A, so DB B cannot be used for data reading yet.

In this case, there are two options:

### Method migration first, data migraion next

Most naturally, in order to let DB B contain full data, we just need to do the data migration from DB A to DB B (while make sure no duplication of data), and after the data migration, we can start to READ from DB B with the strategy we introduced above.

![](images/migration/5.png)

### Data migration first, method migration next
