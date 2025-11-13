/*
 * collision_utils.js
 * Small, focused utilities for circle-vs-circle collision detection and simple resolution.
 * Purpose: show a cleaned/refactored version of the collision logic used in the demo.
 */

const CollisionUtils = (function(){
  /**
   * Test whether two circles are colliding.
   * @param {{x:number,y:number,r:number}} a
   * @param {{x:number,y:number,r:number}} b
   * @returns {boolean}
   */
  function isCircleCollision(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const r = a.r + b.r;
    return dx * dx + dy * dy <= r * r;
  }

  /**
   * Pushes object `b` away from `a` along the collision normal to resolve overlap.
   * This is a tiny, deterministic resolution step intended for visual feedback.
   * @param {{x:number,y:number}} a
   * @param {{x:number,y:number}} b
   * @param {number} [push=8] pixels to push
   */
  function resolveOverlap(a, b, push = 8) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) dist = 1; // avoid divide-by-zero
    const nx = dx / dist;
    const ny = dy / dist;
    b.x -= nx * push;
    b.y -= ny * push;
  }

  return { isCircleCollision, resolveOverlap };
})();

// Usage example (browser):
// if (CollisionUtils.isCircleCollision(player, target)) {
//   CollisionUtils.resolveOverlap(player, target, 12);
//   // trigger collision effect
// }

export default CollisionUtils;