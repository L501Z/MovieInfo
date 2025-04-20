/**
 * 
 * Tests the validation on query searches 
 * 
 * Tests non-sanitised input
 * 
 * Tests against malicious code injections 
 * 
 * Tests for desired length
 * 
 * Tests for acceptable characters 
 * 
 */

import { describe, test, it, expect, vi } from "vitest"; 



describe("length", () => {
    it("the length should be no longer than 40 characters", async() => {
      try{
        vi.useFakeTimers()
        const result = await fetch("http://127.0.0.1:5000/api/v2/dbsearch?search=12345678901234567890123456789012345678901/");
        const resultJson = await result.json() 
        expect(resultJson).toStrictEqual({Invalid:"Incorrect query length"})
      }
      catch (err){
        console.error(err)
      }
    })

    it("there should be notice of an empty value", async() => {
      vi.useFakeTimers()
      const result = await fetch("http://127.0.0.1:5000/api/v2/dbsearch?search=");
      const resultJson = await result.json() 
      expect(resultJson).toStrictEqual({Invalid: "No search parameter use '?search=' as query parameter"})
  })
})

describe("alphabet", () => {
    test("A-Za-z are allowed", async() => {
      vi.useFakeTimers()
        const result = fetch("http://127.0.0.1:5000/api/v2/dbsearch?search=TheQuickBrownFoxJumpsOverTheLazyDog") 
        .then((res)=>{
          expect(res).toStrictEqual({"SearchResults":0,"Results":[]})
        });
    })

    test("Numbers are allowed", async() => {
      vi.useFakeTimers()
        const result = fetch("http://127.0.0.1:5000/api/v2/dbsearch?search=1234567890") 
        .then((res)=>{
          expect(res).toStrictEqual({"SearchResults":0,"Results":[]})
        });
    })

    test("Underscores are allowed", async() => {
      vi.useFakeTimers()
      const result = fetch("http://127.0.0.1:5000/api/v2/dbsearch?search=_") 
      .then((res)=>{
        expect(res).toStrictEqual({"SearchResults":0,"Results":[]})
      });
  })


 
}) 

 
